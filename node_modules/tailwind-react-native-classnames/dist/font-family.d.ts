import type { Rule } from 'css';
import { Style } from './types';
export declare function isFontFamilyRule(rule: Rule): boolean;
export declare function fontFamilyStyle(declarationValue: unknown): Style | null;
