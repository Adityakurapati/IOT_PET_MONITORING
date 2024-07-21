// #define ledpin D3
#define buzzerpin D5
#include <ESP8266WiFi.h>
#include <ThingSpeak.h>

const int motionpin=A0;

const char* ssid = "immu"; // Replace with your WiFi network name
const char* password = "imuksi287"; // Replace with your WiFi password
const char* thingSpeakApiKey = "IGA7SH3B1T2HQ9T3"; // Replace with your ThingSpeak Write API Key
WiFiClient client;
bool motionDetected = false;

void setup() {
  Serial.begin(9600);

  pinMode(ledpin,OUTPUT);
  pinMode(buzzerpin,OUTPUT);
  pinMode(pirPin, INPUT);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
  ThingSpeak.begin(client);
}

void loop() {
  int motion = digitalRead(pirPin);

  if (motion == HIGH) {
    if (!motionDetected) {
      digitalWrite(ledpin,HIGH);
      tone(buzzerpin,100);
      Serial.println("Motion Detected");
      delay(2000);
      sendToThingSpeak(1);
      motionDetected = true;
    }
  } else {
    if (motionDetected) {
      digitalWrite(ledpin,HIGH);
      noTone(buzzerpin);
      Serial.println("NO Motion Detected");
      sendToThingSpeak(0);
      motionDetected = false;
      delay(2000);
    }
  }

  delay(1000); // Adjust the delay as needed
}

void sendToThingSpeak(int motion) {
  ThingSpeak.setField(1, motion);


  if (status == 200) {
    Serial.println("Data sent to ThingSpeak successfully.");
  } else {
    Serial.println("Failed to send data to ThingSpeak. HTTP error code: " + String(status));
  }
}