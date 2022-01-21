export interface QualityItem {
  name: string;
  value: React.Key;
}

export interface PlayerProps
  extends React.DetailedHTMLProps<
    React.VideoHTMLAttributes<HTMLVideoElement>,
    HTMLVideoElement
  > {
  qualityList?: QualityItem;
  defaultQuality?: React.Key;
  nativeControls?: boolean;
  onQualitySelect?: (value: React.Key) => void;
}
