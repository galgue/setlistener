import { useMemo } from "react";
import { usePlayPreview } from "./usePlayPreview";

export const usePreview = (previewUrl: string) => {
  const audio = useMemo(() => new Audio(previewUrl), [previewUrl]);

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
  };
};
