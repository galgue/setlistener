import { useCallback, useEffect, useMemo } from "react";
import { create } from "zustand";
import { useVolume } from "./useVolume";

type State = {
  playedPreview?: HTMLAudioElement;
  playPreview: (preview: HTMLAudioElement) => void;
  stopPreview: () => void;
};

const usePlayedPreviewState = create<State>((set) => {
  return {
    playPreview(preview) {
      set({ playedPreview: preview });
    },
    stopPreview() {
      set({ playedPreview: undefined });
    },
  };
});

export const usePlayPreview = (preview?: HTMLAudioElement) => {
  const state = usePlayedPreviewState();

  const { fadeIn, fadeOut, mute } = useVolume(preview);

  const isPlaying = useMemo(() => {
    return state.playedPreview === preview;
  }, [preview, state.playedPreview]);

  const handlePreview = useCallback(async () => {
    if (!preview) return;
    if (isPlaying) {
      preview.currentTime = 0;
      void preview.play();
      await fadeIn();
    } else {
      if (state.playedPreview) {
        mute();
      } else {
        await fadeOut();
      }
      preview.pause();
    }
  }, [fadeIn, fadeOut, isPlaying, mute, preview, state.playedPreview]);

  useEffect(() => {
    void handlePreview();
  }, [handlePreview]);

  const playPreview = () => {
    if (!preview) return;
    state.playPreview(preview);
  };

  const stopPreview = () => {
    state.stopPreview();
  };

  useEffect(() => {
    if (!preview) return;
    preview.addEventListener("ended", () => preview.pause());
    return () => {
      preview.removeEventListener("ended", () => preview.pause());
    };
  }, [preview]);

  return {
    isPlaying,
    playPreview,
    stopPreview,
  };
};
