export type Styles = {
  'abc': string;
  'helloWorld': string;
  'welcome': string;
};

export type ClassNames = keyof Styles;

declare const styles: Styles;

export default styles;
