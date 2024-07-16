#include <ESP8266WiFi.h>
#include <WiFiClient.h>
#include <ESP8266WebServer.h>
#include <ESP8266mDNS.h>

#include <PubSubClient.h>

#include <ArduinoJson.h>
#include "FS.h"
//#include <Preferences.h>
//Preferences prefs;

const char* ssid = "ynwlzc";
const char* password = "wifi密码";
const char* mqtt_server = "MQ服务器域名"; // 使用HIVEMQ 的信息中转服务
const char* client_id = "标识当前设备的客户端编号";     // 标识当前设备的客户端编号

WiFiClient espClient;
PubSubClient client(espClient); 
long lastMsg = 0;
char msg[50]; 
int value = 0;

ESP8266WebServer server(80);
int wlzcpowerdeng = 0;  //IO14(D5)
const int led = 2;//13

void handleRoot() {
  digitalWrite(led, 1);
  server.send(200, "text/plain", "hello from esp8266!");
  digitalWrite(led, 0);
}

void handleNotFound(){
  digitalWrite(led, 1);


    String message = "{\"meessage\":\"File Not Found ";
  message += "URI: ";
  message += server.uri();
  message += "Method: ";
  message += ( server.method() == HTTP_GET ) ? "GET" : "POST";
  message += "Arguments: ";
  message += server.args();
  message += "";
 String action=server.arg("action");
   message += ";";
   message += ";action="+action;
    message += "\"";
  // Set GPIO2 according to the request

    if(action=="remotepoweron"){
          message += ",\"message\":\"打开开关\"";
           digitalWrite(wlzcpowerdeng, 0);   // 亮灯
        
     }

      if(action=="remotepoweroff"){
          message += ",\"message\":\"打开开关\"";
           digitalWrite(wlzcpowerdeng, 1);   //熄灯
        
     }


  server.send(404, "text/plain", message);
  digitalWrite(led, 0);

  
}

void setup(void){
  pinMode(led, OUTPUT);
   pinMode(wlzcpowerdeng, OUTPUT);//灯控202307
  digitalWrite(led, 0);
  Serial.begin(115200);

   //启动ap
      WiFi.softAP("wlzc_smart_vos_water","yn202305");
    

        
  WiFi.begin(ssid, password);
  Serial.println("");

  // Wait for connection
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to ");
  Serial.println(ssid);
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());

  if (MDNS.begin("esp8266")) {
    Serial.println("MDNS responder started");
  }

  server.on("/", handleRoot);

  server.on("/inline", [](){
    server.send(200, "text/plain", "this works as well");
  });

  server.onNotFound(handleNotFound);

  server.begin();
  Serial.println("HTTP server started");

   client.setServer(mqtt_server, 9883);
  client.setCallback(callback);
  
}

void loop(void){
  server.handleClient();
  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    ++value;
    snprintf (msg, 75, "hello world #%ld", value);
    Serial.print("Publish message: ");
    Serial.println(msg);
    client.publish("outTopic", msg);
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();
/*
  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
   // digitalWrite(wlzcpowerdeng, LOW);   // Turn the LED on (Note that LOW is the voltage level
      digitalWrite(wlzcpowerdeng, 0);   // 亮灯
    // but actually the LED is on; this is because
    // it is acive low on the ESP-01)
  } else {
   // digitalWrite(wlzcpowerdeng, HIGH);  // Turn the LED off by making the voltage HIGH
      digitalWrite(wlzcpowerdeng, 1);   // 亮灯
  }
  */

  payload[length] = '\0'; // 添加一个空值使其转化为字符数组
//String payload1=(char *)payload;

  String action=(char *)payload;
    if(action=="remotepoweron"){
        //  message += ",\"message\":\"打开开关\"";
           digitalWrite(wlzcpowerdeng, 0);   // 亮灯
        
     }

      if(action=="remotepoweroff"){
       //   message += ",\"message\":\"打开开关\"";
           digitalWrite(wlzcpowerdeng, 1);   //熄灯
        
     }

}
void reconnect() {
  // Loop until we're reconnected
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
  //  if (client.connect("cyberwinsmartpower")) {
   if (client.connect(client_id)) {
      Serial.println("connected");
      // Once connected, publish an announcement...
     // client.publish("cyberwinsmartpower_top", "hello world wlzc");
      // ... and resubscribe
      client.subscribe(client_id);//"20230720235350019");
    } else {
      Serial.print("failed, rc=");
     // Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}



