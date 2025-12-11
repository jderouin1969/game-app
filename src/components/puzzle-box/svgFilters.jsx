export const CombinedShadows = () => {
  return(
  <svg width='0' height='0' style={{position: 'absolute'}}>
    <defs>
      <filter id='combined-shadows' 
        x='-50%' y='-50%' 
        width='200%' height='200%'>
        <feDropShadow dx='1' dy='4' stdDeviation='5' 
          floodColor='black' floodOpacity='0.7' result='shadowDrop'/> 
        
        <feOffset in='SourceAlpha' dx='1.5' dy='8' result='offsetTop'/>
        <feGaussianBlur stdDeviation='3' in='offsetTop' result='offsetBlurTop'/>
        <feComposite operator='out' in='SourceAlpha' in2='offsetBlurTop' result='inverseTop'/>
        <feFlood floodColor='white' floodOpacity='.9' result='colorTop'/>
        <feComposite operator='in' in='colorTop' in2='inverseTop' result='shadowTop'/>
        
        <feOffset in='SourceAlpha' dx='-1.5' dy='-8' result='offsetBottom'/>
        <feGaussianBlur stdDeviation='3' in='offsetBottom' result='offsetBlurBottom'/>
        <feComposite operator='out' in='SourceAlpha' in2='offsetBlurBottom' result='inverseBottom'/>
        <feFlood floodColor='gray' floodOpacity='.9' result='colorBottom'/>
        <feComposite operator='in' in='colorBottom' in2='inverseBottom' result='shadowBottom'/>
        
        <feComposite operator='over' in='shadowBottom' in2='shadowTop' result='shadow'/>
        <feComposite operator='over' in='shadow' in2='shadowDrop' result='shadowFinal'/>
        <feMerge>
          <feMergeNode in="SourceGraphic"/>
          <feMergeNode in='shadowFinal'/>
        </feMerge>
      </filter>
    </defs>
    <defs>
      <filter id='combined-shadows-transition' 
        x='-50%' y='-50%' 
        width='200%' height='200%'>
        <feDropShadow dx='.5' dy='2' stdDeviation='1' 
          floodColor='black' floodOpacity='0.7' result='shadowDrop'/> 
        
        <feOffset in='SourceAlpha' dx='1.5' dy='8' result='offsetTop'/>
        <feGaussianBlur stdDeviation='3' in='offsetTop' result='offsetBlurTop'/>
        <feComposite operator='out' in='SourceAlpha' in2='offsetBlurTop' result='inverseTop'/>
        <feFlood floodColor='gray' floodOpacity='.9' result='colorTop'/>
        <feComposite operator='in' in='colorTop' in2='inverseTop' result='shadowTop'/>
        
        <feOffset in='SourceAlpha' dx='-1.5' dy='-8' result='offsetBottom'/>
        <feGaussianBlur stdDeviation='3' in='offsetBottom' result='offsetBlurBottom'/>
        <feComposite operator='out' in='SourceAlpha' in2='offsetBlurBottom' result='inverseBottom'/>
        <feFlood floodColor='gray' floodOpacity='.9' result='colorBottom'/>
        <feComposite operator='in' in='colorBottom' in2='inverseBottom' result='shadowBottom'/>
        
        <feComposite operator='over' in='shadowBottom' in2='shadowTop' result='shadow'/>
        <feComposite operator='over' in='shadow' in2='shadowDrop' result='shadowFinal'/>
        <feMerge>
          <feMergeNode in="SourceGraphic"/>
          <feMergeNode in='shadowFinal'/>
        </feMerge>
      </filter>
    </defs>
  </svg>
  );
};