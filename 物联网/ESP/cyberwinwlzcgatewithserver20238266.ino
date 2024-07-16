#include <Ethernet.h>

#include <ESP8266WiFi.h>
//#include <WiFiClient.h>
//#include <WebServer.h>
//#include <ESPmDNS.h>
//#include <ESPmDNS.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

#include <Preferences.h> //系统存储

#define ETH_ADDR        0//PHY地址和板子上对应，默认是0
#define ETH_POWER_PIN  -1
#define ETH_MDC_PIN    23
#define ETH_MDIO_PIN   18
#define LED             2
#define ETH_TYPE       ETH_PHY_LAN8720
#define ETH_CLK_MODE   ETH_CLOCK_GPIO17_OUT
#define ETH_RESET      5//ESP32的io5可控制以太网模块复位，低电平有效，不用时可不用配置



//未来之窗
const char* ssid = "ynwlzc";
const char* password = "wifi密码";
WebServer server(80);

String ip = "192.168.1.191";
String sn = "255.255.255.0";
String gw = "192.168.1.1";


int wlzcpowerdeng = 0;  //IO14(D5)

const char *host = "192.168.1.199";//tcp服务器地址

WiFiClient client;
const int tcpPort = 8266;//服务器端口

static bool eth_connected = false;

bool cyberwin_tcp_server_open = true;//TCP服务

void WiFiEvent(WiFiEvent_t event)
{
 
  switch (event) {
   case SYSTEM_EVENT_ETH_START://ARDUINO_EVENT_ETH_START:
      Serial.println("ETH Started");
      //set eth hostname here
      ETH.setHostname("esp32-ethernet");
      break;
    case SYSTEM_EVENT_ETH_CONNECTED: //接入网络 ARDUINO_EVENT_ETH_CONNECTED:
      Serial.println("ETH Connected");
      
      
      if (!eth_connected) //设置固定ip，删掉可以自动获取ip
    {

        IPAddress static_ip;
        IPAddress static_sn;
        IPAddress static_gw;
        static_ip.fromString(ip);
        static_sn.fromString(sn);
        static_gw.fromString(gw);
       // ETH.config(static_ip, static_gw, static_sn);
       //取消IP
      }
      break;
    case SYSTEM_EVENT_ETH_GOT_IP: //接入网络 ARDUINO_EVENT_ETH_GOT_IP:
      Serial.print("ETH MAC: ");
      Serial.print(ETH.macAddress());
      Serial.print(", IPv4: ");
      Serial.print(ETH.localIP());


      if (ETH.fullDuplex()) {
        Serial.print(", FULL_DUPLEX");
      }
      Serial.print(", ");
      Serial.print(ETH.linkSpeed());
      Serial.println("Mbps");
      //eth_connected = true;
      digitalWrite(LED, LOW);
if (ETH.localIP().toString() == "0.0.0.0") {
        Serial.println("NO NO NO");//获取不到ip来一次以太网重启
        digitalWrite(ETH_RESET, LOW);
        delay(200);
        digitalWrite(ETH_RESET, HIGH);
        eth_connected = false;
      } else {
        eth_connected = true;
      }
      break;
    case SYSTEM_EVENT_ETH_DISCONNECTED: //失去连接 ARDUINO_EVENT_ETH_DISCONNECTED:
      Serial.println("ETH Disconnected");
      digitalWrite(LED, HIGH);

      eth_connected = false;
      break;
    case SYSTEM_EVENT_ETH_STOP: //关闭 ARDUINO_EVENT_ETH_STOP:
      Serial.println("ETH Stopped");
      digitalWrite(LED, HIGH);
      eth_connected = false;
      break;
    default:
      break;
  }
}

void setup()
{
  Serial.begin(9600);
  pinMode(LED, OUTPUT);
  pinMode(ETH_RESET, OUTPUT);
  digitalWrite(ETH_RESET, HIGH);
  Serial.println();

     Preferences prefs;
     prefs.begin("wlzcsmartvos");
     if(prefs.isKey("tcpserveropen")) { // 如果当前命名空
        String tcp_server_open = prefs.getString("tcpserveropen");
        if(tcp_server_open == "open"){
          
        }else{
          cyberwin_tcp_server_open = false;
        }
          
    } 

     if(prefs.isKey("wifi_ssid")) { // 
        String c_wifi_ssid = prefs.getString("wifi_ssid");
        //启动ap
        const char* c_wifi_ssid_char =c_wifi_ssid.c_str();
           WiFi.softAP(c_wifi_ssid_char,"yn202305");
     }else{
      //启动ap
        WiFi.softAP("wlzc_smart_vos","yn202305");
      
     }

      if(prefs.isKey("eth_ip")) { // 
           

              String c_eth_ip = prefs.getString("eth_ip");
              String c_eth_mask = prefs.getString("eth_mask");
              String c_eth_gw = prefs.getString("eth_gw");

               IPAddress static_ip_a;
               IPAddress static_mask_a;
               IPAddress static_gw_a;
              static_ip_a.fromString(c_eth_ip);
              static_mask_a.fromString(c_eth_mask);
              static_gw_a.fromString(c_eth_gw);
          
           
              ETH.config(static_ip_a, static_gw_a, static_mask_a);
      }

     
    
  
  //链接
 // WiFi.mode(WIFI_STA);
    WiFi.begin ( ssid, password );


  WiFi.onEvent(WiFiEvent);
  ETH.begin(ETH_ADDR, ETH_POWER_PIN, ETH_MDC_PIN, ETH_MDIO_PIN, ETH_TYPE, ETH_CLK_MODE); //启用ETH

  digitalWrite(LED, LOW);

 // Wait for connection
 /*
  * wifi 不再是必须，不请求互联网
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
 */
  if (MDNS.begin("esp32")) {
    Serial.println("MDNS responder started");
  }



//启动服务器
  server.on ( "/", handleRoot );
  server.on ( "/test.svg", drawGraph );
  server.on ( "/inline", []() {
    server.send ( 200, "text/plain", "this works as well" );
  } );
  server.onNotFound ( handleNotFound );
  server.begin();
  Serial.println ( "HTTP server started" );
  
}

void loop()
{

   server.handleClient();
    delay(2);//allow the cpu to switch to other tas

    if (cyberwin_tcp_server_open == false){
      //关闭它产品服务
        return;
    }
  
  if (!eth_connected) {
    return;
  }

  if (!client.connected())//连接tcp服务器
  {
    if (!client.connect(host, tcpPort))
    {
      Serial.println("connection....");
      delay(500);

    }
   
    
    
  }

  while (client.available())
  {
    char val = client.read();
    Serial.println(val);
    if (val == 'a')
    {
      digitalWrite(LED, HIGH);
      delay(1000);
      digitalWrite(LED, LOW);
      client.print("bb");
      client.flush();
    }
     if (val == 'c')
    {
    //  digitalWrite(LED, HIGH);
    //  delay(1000);
     // digitalWrite(LED, LOW);
     String data = "8A0100119A";
     //这里长度记得除下2    使用前校验一下String的长度是否正确
      byte byteArray[data.length() / 2] = {0};
      hexCharacterStringToBytes(byteArray, data.c_str());
    //  Serial.begin(9600);
      Serial.write(byteArray,5);

 

      client.print("wlzc lock");
      client.flush();
    }
  }

}


void handleRoot() {
//  digitalWrite ( led, 1 );
  char temp[400];
  int sec = millis() / 1000;
  int min = sec / 60;
  int hr = min / 60;

  snprintf ( temp, 400,

"<html>\
  <head>\
    <meta http-equiv='refresh' content='5'/>\
    <title>未来之窗智能终端</title>\
    <style>\
      body { background-color: #cccccc; font-family: Arial, Helvetica, Sans-Serif; Color: #000088; }\
    </style>\
  </head>\
  <body>\
    <h1>未来之窗智能终端-智能家居!</h1>\
    <p>Uptime: %02d:%02d:%02d</p>\
    <img src=\"/test.svg\" />\
  </body>\
</html>",

    hr, min % 60, sec % 60
  );
  server.send ( 200, "text/html", temp );
//  digitalWrite ( led, 0 );
}

void handleNotFound() {
//  digitalWrite ( led, 1 );
  String message = "{\"meessage\":\"File Not Found ";
  message += "URI: ";
  message += server.uri();
  message += "Method: ";
  message += ( server.method() == HTTP_GET ) ? "GET" : "POST";
  message += "Arguments: ";
  message += server.args();
  message += "";

  

  for ( uint8_t i = 0; i < server.args(); i++ ) {
    message += " " + server.argName ( i ) + "= " + server.arg ( i ) + ";";
  }
 String action=server.arg("action");
   message += ";";
   message += ";action="+action;
    message += "\"";
   Serial.println("action="+action);
   if(action=="lock"){
       Serial.println("openlock");
       
        Serial.print(138, HEX);// "4E"
         Serial.print(1, HEX);// "4E"
          Serial.print(1, HEX);// "4E"
          Serial.print(17, HEX);// "4E"
           Serial.print(155, HEX);// "4E"
        
      //  message += "<hr>门锁已经打开";
       message += ",\"message\":\"门锁已经打开\"";
          digitalWrite(3, HIGH);
          delay(2000);
   }

    if(action=="lock2"){
      
       
        Serial.write(138);// "4E"
         Serial.write(1);// "4E"
          Serial.write(1);// "4E"
          Serial.write(17);// "4E"
           Serial.write(155);// "4E"
        
       // message += "<hr>门锁已经打开2";
        message += ",\"message\":\"门锁已经打开2\"";
         // digitalWrite(3, HIGH);
         // delay(2000);
   }

    if(action=="openalllock"){

     String data = "8A0100119A";
     //这里长度记得除下2    使用前校验一下String的长度是否正确
      byte byteArray[data.length() / 2] = {0};
      hexCharacterStringToBytes(byteArray, data.c_str());
       //  Serial.begin(9600);
      Serial.write(byteArray,5);

      //   message += "<hr>门锁已经打开";
          message += ",\"message\":\"门锁全部已经打开\"";

      
    }

     if(action=="remoteopenlock"){

       String data = "8A0100119A";
        String param1=server.arg("param1");
        data = param1;//赋值
        
     //这里长度记得除下2    使用前校验一下String的长度是否正确
      byte byteArray[data.length() / 2] = {0};
      hexCharacterStringToBytes(byteArray, data.c_str());
       //  Serial.begin(9600);
      Serial.write(byteArray,5);

       //  message += "<hr>门锁已经打开";
        message += ",\"message\":\"门锁指令操作成功\"";
       message += ",\"param1\":\""+param1+"\"";

      
    }

      if(action=="restart"){
          message += ",\"message\":\"重启\"";
          ESP.restart();
        
      }


       if(action=="sysstem_getconfig"){
          message += ",\"message\":\"读取系统配置\"";
           String param1=server.arg("param1");

            message =message+ ",\"param1\":\""+param1+"\"";
           
            Preferences prefs;
           prefs.begin("wlzcsmartvos");
           const char* paramkey =param1.c_str();
           if(prefs.isKey(paramkey)) { // 如果当前命名空间中有键名为"naisu"的元素
               // Serial.printf("naisu: %s\n\n", prefs.getString("naisu"));
               String data =  prefs.getString(paramkey);
               message =message+ ",\"data\":\""+data+"\"";
       
           } else {
             message =message+ ",\"data\":\""+"cyber_empty"+"\"";
            
           }
          
        
      }

        if(action=="sysstem_setconfig"){
          message += ",\"message\":\"配置系统配置\"";
           String param1=server.arg("param1");
           String param2=server.arg("param2");

            message =message+ ",\"param1\":\""+param1+"\"";
            message =message+ ",\"param2\":\""+param2+"\"";
           
            Preferences prefs;
           prefs.begin("wlzcsmartvos");
           const char* paramkey =param1.c_str();
           if(prefs.isKey(paramkey)) { // 如果当前命名空间中有键名为"naisu"的元素
               // Serial.printf("naisu: %s\n\n", prefs.getString("naisu"));
             //  String data =  prefs.getString(param1);
               message =message+ ",\"data\":\""+param2+"\"";

               prefs.putString(paramkey, param2);
               prefs.end();
       
           } else {
             message =message+ ",\"data\":\""+param2+"\"";
              prefs.putString(paramkey, param2);
               prefs.end();
            
           }
          
        
      }


  if(action=="sysstem_setip"){
     String param1=server.arg("param1");
     String param2=server.arg("param2");
     String param3=server.arg("param3");
          IPAddress static_ip_s;
          IPAddress static_mask_s;
          IPAddress static_gw_s;
          static_ip_s.fromString(param1);
          static_mask_s.fromString(param2);
          static_gw_s.fromString(param3);
            Preferences prefs;
            prefs.begin("wlzcsmartvos");
            prefs.putString("eth_ip", param1);
            prefs.putString("eth_mask", param2);
            prefs.putString("eth_gw", param3);
            prefs.end();
           
          ETH.config(static_ip_s, static_gw_s, static_mask_s);
  }

    if(action=="remotepoweron"){
          message += ",\"message\":\"打开开关\"";
           digitalWrite(wlzcpowerdeng, 0);   // 亮灯
        
     }

      if(action=="remotepoweroff"){
          message += ",\"message\":\"打开开关\"";
           digitalWrite(wlzcpowerdeng, 1);   //熄灯
        
     }

 

    
    
     message += "}";
 

  server.send ( 404, "text/html", message );
  //digitalWrite ( led, 0 );
}

//未来之窗控制门锁
void cyber_openlock(int bord ,int lock){
         Serial.write(138);//
         Serial.write(bord);// 
          Serial.write(lock);// 
          Serial.write(17);//
          Serial.write(155);//
        
     
}

void drawGraph() {
  String out = "";
  char temp[100];
  out += "<svg xmlns=\"http://www.w3.org/2000/svg\" version=\"1.1\" width=\"400\" height=\"150\">\n";
  out += "<rect width=\"400\" height=\"150\" fill=\"rgb(250, 230, 210)\" stroke-width=\"1\" stroke=\"rgb(0, 0, 0)\" />\n";
  out += "<g stroke=\"black\">\n";
  int y = rand() % 130;
  for (int x = 10; x < 390; x+= 10) {
    int y2 = rand() % 130;
    sprintf(temp, "<line x1=\"%d\" y1=\"%d\" x2=\"%d\" y2=\"%d\" stroke-width=\"1\" />\n", x, 140 - y, x + 10, 140 - y2);
    out += temp;
    y = y2;
  }
  out += "</g>\n</svg>\n";

  server.send ( 200, "image/svg+xml", out);
}

//高级玩法16进制字符串转16进制
void hexCharacterStringToBytes(byte *byteArray, const char *hexString)
{
    bool oddLength = strlen(hexString) & 1;

    byte currentByte = 0;
    byte byteIndex = 0;

    for (byte charIndex = 0; charIndex < strlen(hexString); charIndex++)
    {
        bool oddCharIndex = charIndex & 1;

        if (oddLength)
        {
            // If the length is odd
            if (oddCharIndex)
            {
                // odd characters go in high nibble
                currentByte = nibble(hexString[charIndex]) << 4;
            }
            else
            {
                // Even characters go into low nibble
                currentByte |= nibble(hexString[charIndex]);
                byteArray[byteIndex++] = currentByte;
                currentByte = 0;
            }
        }
        else
        {
            // If the length is even
            if (!oddCharIndex)
            {
                // Odd characters go into the high nibble
                currentByte = nibble(hexString[charIndex]) << 4;
            }
            else
            {
                // Odd characters go into low nibble
                currentByte |= nibble(hexString[charIndex]);
                byteArray[byteIndex++] = currentByte;
                currentByte = 0;
            }
        }
    }
}

byte nibble(char c)
{
    if (c >= '0' && c <= '9')
        return c - '0';

    if (c >= 'a' && c <= 'f')
        return c - 'a' + 10;

    if (c >= 'A' && c <= 'F')
        return c - 'A' + 10;

    return 0; // Not a valid hexadecimal character
}



