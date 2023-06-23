import { useMemo } from "react";
import { usePlayPreview } from "./usePlayPreview";

export const usePreview = (previewUrl?: string) => {
  const audio = useMemo(
    () => (previewUrl ? new Audio(previewUrl) : undefined),
    [previewUrl]
  );

  const { isPlaying, playPreview, stopPreview } = usePlayPreview(audio);

  const onPlayClick = () => {
    if (isPlaying) {
      stopPreview();
    } else {
      playPreview();
    }
  };

  return {
    isPlaying,
    onPlayClick,
    havePreview: Boolean(previewUrl),
  };
};
