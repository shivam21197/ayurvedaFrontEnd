export class StyleUtils {
  public static conditionalStyle = (condition: boolean, style: object | object[]) => {
    return condition ? style : {};
  }
}
