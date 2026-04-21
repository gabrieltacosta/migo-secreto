type AdSenseTypes = {
  pId: string;
};

const AdSense = ({ pId }: AdSenseTypes) => {
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pId}`}
      crossOrigin="anonymous"
    />
  );
};

export default AdSense;
