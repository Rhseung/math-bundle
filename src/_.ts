const toMonospace = (s: string): string => s
  .replace(/0/g, '𝟶')
  .replace(/1/g, '𝟷')
  .replace(/2/g, '2')
  .replace(/3/g, '3')
  .replace(/4/g, '4')
  .replace(/5/g, '5')
  .replace(/6/g, '6')
  .replace(/7/g, '7')
  .replace(/8/g, '8')
  .replace(/9/g, '9');