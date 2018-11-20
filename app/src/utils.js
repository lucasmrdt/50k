// @flow

import { StyleSheet } from 'react-native';

import { type StylesheetType } from '@/types/rnTypes';

/**
 * WHY ?
 * Because flow don't show style's types when i'm typing
 * rule with StyleSheet.create.
 */
type CreateStyleSheetParam = {[key: string]: StylesheetType};
export const createStyleSheet = (styles: CreateStyleSheetParam) => (
  StyleSheet.create(styles)
);
