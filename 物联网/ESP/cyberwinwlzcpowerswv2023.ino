#include <ESP8266WiFi.h>
#include <PubSubClient.h>
int deng = 0;  //IO14(D5)
const char* ssid = "ynwlzc";
const char* password = "12345678";
const char* mqtt_server = "51.onelink.ynwlzc.cn"; // 使用HIVEMQ 的信息中转服务
const char* TOPIC = "20230703124550016";              // 订阅信息主题
const char* client_id = "20230703124550016";     // 标识当前设备的客户端编号

WiFiClient espClient;                                                         // 定义wifiClient实例
PubSubClient client(espClient);                                         // 定义PubSubClient的实例
long lastMsg = 0;                                                               // 记录上一次发送信息的时长

void setup() {
  pinMode(deng, OUTPUT);                               // 定义板载LED灯为输出方式
  Serial.begin(115200); 
  setup_wifi();                                                                    //执行Wifi初始化，下文有具体描述
  client.setServer(mqtt_server, 9883);                              //设定MQTT服务器与使用的端口，1883是默认的MQTT端口
  client.setCallback(callback);                                          //设定回调方式，当ESP8266收到订阅消息时会调用此方法
}

void setup_wifi() {

  delay(10);
  // 板子通电后要启动，稍微等待一下让板子点亮
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.begin(ssid, password);
  WiFi.mode(WIFI_STA);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) {
  Serial.print("Message arrived [");
  Serial.print(topic);   // 打印主题信息
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]); // 打印主题内容
  }
  Serial.println();

  if ((char)payload[0] == '0') {
    digitalWrite(deng, 0);   // 亮灯
    Serial.println("已开灯");
  } else {
    digitalWrite(deng, 1);   // 熄灯
    Serial.println("已关灯");
  }
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    if (client.connect(client_id)) {
      Serial.println("connected");
      // 连接成功时订阅主题
      client.subscribe(TOPIC);
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}

void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();

  long now = millis();
  if (now - lastMsg > 2000) {
    lastMsg = now;
    client.publish("home/status/", "{device:client_id,'status':'on'}");
  }
}

