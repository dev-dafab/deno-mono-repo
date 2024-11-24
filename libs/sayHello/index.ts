export function sayHello(name?: string): {greeting: string} {
  return {greeting: `Hello ${name ? name : 'World'}`};
}
