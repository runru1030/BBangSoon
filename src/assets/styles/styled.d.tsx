import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: {
      blue: string;
      red: string;
      border_grey:string;
    };
  }
}