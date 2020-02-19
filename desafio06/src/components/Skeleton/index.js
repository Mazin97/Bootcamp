import React from 'react';

import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

export default function Skeleton(props) {
  return (
    <ShimmerPlaceHolder
      autoRun
      duration={2000}
      colorShimmer={['#eee', '#ddd', '#eee']}
      {...props}
    />
  );
}
