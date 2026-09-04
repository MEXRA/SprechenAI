import type { Metadata } from "next";
import { ConversationWorkspace } from "@/components/conversation/ConversationWorkspace";

export const metadata: Metadata = { title: "Conversation practice" };

export default function ConversationPage() {
  return <ConversationWorkspace />;
}
