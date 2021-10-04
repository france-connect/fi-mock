
export function getErrorCode(input) {
  return input.split('_').pop();
}


export async function wait(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export const logger = console;
