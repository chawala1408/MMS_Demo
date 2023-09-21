#include <ArduinoJson.h>


void setup() {
  // put your setup code here, to run once:
Serial.begin(9600);
StaticJsonDocument<256> doc;
doc["sensor"]=25;
doc["time"] = 1351824120;

JsonArray data = doc.createNestedArray("data");
data.add(48.75080);
data.add(2.302038);

char out[128];
int b = serializeJson(doc,out);
Serial.print("bytes = ");
Serial.print(b,DEC);
//boolean rc = mqttClient.publish("arduino-test",out)
}

void loop() {
  // put your main code here, to run repeatedly:


}
