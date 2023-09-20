#include <WiFi.h>
#include <ESPmDNS.h>
#include <WiFiUdp.h>
#include <ArduinoOTA.h>
#include "PubSubClient.h"
#include <ModbusMaster.h>
#include <ArduinoJson.h>
#include <esp_task_wdt.h>
#include <iostream>
#include <string>
#define WDT_TIMEOUT 300

//LiquidCrystal_I2C lcd(0x27, 20, 4);

ModbusMaster node;

#define led_connection 41
#define led_published 42

const char* ssid = "MIC_IIOT";
const char* password = "mic@admin";
const char* mqtt_server = "192.168.0.103";

IPAddress local_IP(192, 168, 0, 10);
IPAddress gateway(192, 168, 0, 1);
IPAddress subnet(255, 255, 255, 0);

char Machine_no[] = "BM165_146";
//////////////////////SETUP/////////////////////////

WiFiClient espClient;
PubSubClient client(espClient);

int count_connection;

void setup_wifi() 
{
  esp_task_wdt_reset();
  delay(10);
  // We start by connecting to a WiFi network
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);

  WiFi.config(local_IP, gateway, subnet);
  //WiFi.mode(WIFI_STA);
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) 
  {
    esp_task_wdt_reset();
    count_connection++;
    digitalWrite(led_connection, HIGH);delay(100);digitalWrite(led_connection, LOW);delay(100);  
    Serial.print(".");
    if(count_connection>20)
    {
      ESP.restart();
    }
  }

  randomSeed(micros());

  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());
}

void callback(char* topic, byte* payload, unsigned int length) 
{
  esp_task_wdt_reset();
  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("] ");
  for (int i = 0; i < length; i++) {
    Serial.print((char)payload[i]);
  }
  Serial.println();

  // Switch on the LED if an 1 was received as first character
  if ((char)payload[0] == '1') {
    //digitalWrite(BUILTIN_LED, LOW);   // Turn the LED on (Note that LOW is the voltage level
    // but actually the LED is on; this is because
    // it is active low on the ESP-01)
  } else {
    //digitalWrite(BUILTIN_LED, HIGH);  // Turn the LED off by making the voltage HIGH
  }

}

int timeout ;

void reconnect() 
{
  esp_task_wdt_reset();
  // Loop until we're reconnected
  while(!client.connected()) 
  {
    digitalWrite(led_connection, HIGH);  
    Serial.print("Attempting MQTT connection...");
    // Create a random client ID
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    // Attempt to connect
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");
      // Once connected, publish an announcement...
      //client.publish("outTopic", "hello world");
      // ... and resubscribe
      client.subscribe("inTopic");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      //delay(5000);
      digitalWrite(led_connection, HIGH);delay(300);digitalWrite(led_connection, LOW);delay(300);    
      timeout++;
      if(timeout >= 10)
      {
        ESP.restart();
      }
    }
  }
}

void setup() 
{
  Serial.begin(9600);
  Serial1.begin(9600);
  esp_task_wdt_init(WDT_TIMEOUT, true); 
  esp_task_wdt_add(NULL);
  esp_task_wdt_reset();
  node.begin(1,Serial1);
  pinMode ( led_connection , OUTPUT);
  pinMode ( led_published, OUTPUT);
  Serial.println("Booting");
  setup_wifi(); 

  ArduinoOTA.setHostname(Machine_no);

  // No authentication by default
  ArduinoOTA.setPassword("1234");

  // Password can be set with it's md5 value as well
  // MD5(admin) = 21232f297a57a5a743894a0e4a801fc3
  // ArduinoOTA.setPasswordHash("21232f297a57a5a743894a0e4a801fc3");

  ArduinoOTA
    .onStart([]() {
      String type;
      if (ArduinoOTA.getCommand() == U_FLASH)
        type = "sketch";
      else // U_SPIFFS
        type = "filesystem";

      // NOTE: if updating SPIFFS this would be the place to unmount SPIFFS using SPIFFS.end()
      Serial.println("Start updating " + type);
    })
    .onEnd([]() {
      Serial.println("\nEnd");
    })
    .onProgress([](unsigned int progress, unsigned int total) {
      Serial.printf("Progress: %u%%\r", (progress / (total / 100)));
    })
    .onError([](ota_error_t error) {
      Serial.printf("Error[%u]: ", error);
      if (error == OTA_AUTH_ERROR) Serial.println("Auth Failed");
      else if (error == OTA_BEGIN_ERROR) Serial.println("Begin Failed");
      else if (error == OTA_CONNECT_ERROR) Serial.println("Connect Failed");
      else if (error == OTA_RECEIVE_ERROR) Serial.println("Receive Failed");
      else if (error == OTA_END_ERROR) Serial.println("End Failed");
    });

  ArduinoOTA.begin();

  Serial.println("Ready");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback); 
}

String rssi,D500,D228,D238,D248,D60,D62,D64;

char d_rssi[16],d1[16],d2[16],d3[16],d4[16],d5[16],d6[16],d7[16];

int num = 7;

void loop() 
{
  ArduinoOTA.handle();
  if (!client.connected()) 
  {
    esp_task_wdt_reset();
    reconnect();
  }
  client.loop();
  esp_task_wdt_reset();
  uint8_t j, result;
  uint16_t data[num];
  digitalWrite(led_connection, HIGH);  
  digitalWrite(led_published, HIGH);
  Serial.println("\n---------------starting loop----------------");

  result = node.readHoldingRegisters(0, num);
  if (result == node.ku8MBSuccess)
  {
    for (j = 0; j < num; j++)
    {
      data[j] = node.getResponseBuffer(j);
      delay(10);
    }
    D500 = String(data[0]);Serial.print("TARGET_SHIFT : ");Serial.println(D500);
    D228 = String(data[1]);Serial.print("TOTAL_OUT_SHIFTA : ");Serial.println(D228);
    D238 = String(data[2]);Serial.print("TOTAL_OUT_SHIFTB : ");Serial.println(D238);
    D248 = String(data[3]);Serial.print("TOTAL_OUT_SHIFTC : ");Serial.println(D248);
    D60 = String(data[4]);Serial.print("TOTAL_YIELD_SHIFTA : ");Serial.println(D60);
    D62 = String(data[5]);Serial.print("TOTAL_YIELD_SHIFTB : ");Serial.println(D62);
    D64 = String(data[6]);Serial.print("TOTAL_YIELD_SHIFTC : ");Serial.println(D64);    
    esp_task_wdt_reset();
    digitalWrite(led_published, LOW);delay(500);digitalWrite(led_published, HIGH);delay(500);
  }
  rssi = WiFi.RSSI(); // WiFi strength
  Serial.print("rssi : ");Serial.println(WiFi.RSSI());

  delay(500);
  esp_task_wdt_reset();
  D500.toCharArray(d1, 16);
  D228.toCharArray(d2, 16);
  D238.toCharArray(d3, 16);
  D248.toCharArray(d4, 16);
  D60.toCharArray(d5, 16);
  D62.toCharArray(d6, 16);
  D64.toCharArray(d7, 16);
  rssi.toCharArray(d_rssi, 16);
  esp_task_wdt_reset();

  // สร้าง JSON object
  StaticJsonDocument<5000> doc;

  doc["rssi"] = d_rssi;
  doc["D500"] = d1;
  doc["D228"] = d2;
  doc["D238"] = d3;
  doc["D248"] = d4;
  doc["D60"] = d5;
  doc["D62"] = d6;
  doc["D64"] = d7;
//  
  // แปลง JSON object เป็น string
  String jsonStr;
//  serializeJson(doc, jsonStr);

  // ส่งข้อมูลผ่าน MQTT
  client.publish("mic/test/BM165_146", jsonStr.c_str());
  Serial.println(jsonStr);

  
  Serial.println("\n---------------finish loop------------------\n\n");
  delay(5000);
}
