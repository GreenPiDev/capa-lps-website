import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(useGSAP, CustomEase, ScrollTrigger, SplitText);

export { CustomEase, gsap, ScrollTrigger, SplitText, useGSAP };
