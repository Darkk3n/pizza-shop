"use client";

import { Volume2Icon, VolumeOffIcon } from "lucide-react";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { enableAndPreview, isSoundEnabled, isSoundEnabledOnServer, setSoundEnabled, subscribeSoundSetting } from "./orderSounds";

// Header switch for the order feed's sounds (staff only, rendered by OrderFeed).
export const OrderSoundToggle = () => {
  const enabled = useSyncExternalStore(subscribeSoundSetting, isSoundEnabled, isSoundEnabledOnServer);
  const action = enabled ? "Mute order sounds" : "Turn on order sounds";

  return (
    <Button
      variant="ghost"
      size="icon-lg"
      aria-label="Order sounds"
      title={action}
      aria-pressed={enabled}
      onClick={() => (enabled ? setSoundEnabled(false) : void enableAndPreview())}
    >
      {enabled ? <Volume2Icon className="size-4" /> : <VolumeOffIcon className="size-4" />}
    </Button>
  );
};
