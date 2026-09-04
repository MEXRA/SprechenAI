import type { Scenario } from "@/types";

export const scenarios: Scenario[] = [
  { id: "restaurant", title: "Restaurant", germanTitle: "Im Restaurant", description: "Order, ask questions, and handle the bill.", icon: "🍽", color: "bg-[#fff0e8]", duration: "8–12 min" },
  { id: "doctor", title: "Doctor", germanTitle: "Beim Arzt", description: "Describe symptoms and understand advice.", icon: "✚", color: "bg-[#e9f3ff]", duration: "10–15 min" },
  { id: "work", title: "Work", germanTitle: "Bei der Arbeit", description: "Chat with colleagues and plan your day.", icon: "▣", color: "bg-[#ececfb]", duration: "8–12 min" },
  { id: "supermarket", title: "Supermarket", germanTitle: "Im Supermarkt", description: "Find products, compare, and check out.", icon: "🛒", color: "bg-[#edf6e8]", duration: "6–10 min" },
  { id: "airport", title: "Airport", germanTitle: "Am Flughafen", description: "Check in, find your gate, and ask for help.", icon: "✈", color: "bg-[#e7f5f6]", duration: "10–15 min" },
  { id: "apartment", title: "Apartment Viewing", germanTitle: "Wohnungsbesichtigung", description: "Meet the landlord and inspect a home.", icon: "⌂", color: "bg-[#fff4d9]", duration: "12–16 min" },
  { id: "people", title: "Meeting New People", germanTitle: "Neue Leute kennenlernen", description: "Introduce yourself and keep chatting.", icon: "☺", color: "bg-[#f7eafa]", duration: "8–12 min" },
  { id: "football", title: "Football", germanTitle: "Beim Fußball", description: "Talk teams, players, and match-day moments.", icon: "⚽", color: "bg-[#e7f2e9]", duration: "8–12 min" },
  { id: "date", title: "Date", germanTitle: "Beim Date", description: "Make plans and get to know someone.", icon: "♥", color: "bg-[#ffe9eb]", duration: "10–15 min" },
  { id: "custom", title: "Custom Scenario", germanTitle: "Eigenes Szenario", description: "Create a conversation for your own situation.", icon: "+", color: "bg-[#eeeeea]", duration: "You decide" },
];

