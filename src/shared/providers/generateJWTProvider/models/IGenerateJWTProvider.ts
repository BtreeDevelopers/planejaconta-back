export default interface IGenerateJWTProvider {
  generate(userId: string): Promise<string>;
}
