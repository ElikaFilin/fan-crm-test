import * as process from 'process';

type TextColorType =
  | 'default'
  | 'black'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white';

type BackgroundColorType =
  | 'default'
  | 'black'
  | 'blue'
  | 'magenta'
  | 'cyan'
  | 'white';

const textColors = [
  ['default', '0'],
  ['black', '30'],
  ['blue', '34'],
  ['magenta', '35'],
  ['cyan', '36'],
  ['white', '37'],
] as Iterable<readonly [TextColorType, string]>;

const backgroundColors = [
  ['default', '0'],
  ['black', '40'],
  ['blue', '44'],
  ['magenta', '45'],
  ['cyan', '46'],
  ['white', '47'],
] as Iterable<readonly [BackgroundColorType, string]>;

const textColorsMapping = new Map(textColors);
const backgroundColorsMapping = new Map(backgroundColors);

function getSequenceWithTextColor(color: TextColorType) {
  return `\x1b[${textColorsMapping.get(color)}m`;
}
function getSequenceWithBackgroundColor(color: BackgroundColorType) {
  return `\x1b[${backgroundColorsMapping.get(color)}m`;
}
function getResetSequence() {
  return '\x1b[0m';
}
function getSubstitutions<T>(messages: T[]): string {
  let substitutions = '';
  messages.forEach(() => {
    substitutions += '%s';
  });
  return substitutions;
}
function convertObjectToString<T>(messages: T[]): (string | T)[] {
  return messages.map((message) => {
    if (typeof message === 'string') {
      return message;
    } else if (message instanceof Error) {
      return `${message.name}: ${message.message}\n${message.stack}`;
    } else {
      return JSON.stringify(message, null, 2);
    }
  });
}

class Logger {
  err<T>(...messages: T[]) {
    console.error(
      `\x1b[31m${getSubstitutions(messages)}\x1b[0m`,
      ...convertObjectToString(messages),
    );
  }
  succ<T>(...messages: T[]) {
    console.log(
      `\x1b[32m${getSubstitutions(messages)}\x1b[0m`,
      ...convertObjectToString(messages),
    );
  }
  warn<T>(...messages: T[]) {
    console.warn(
      `\x1b[33m${getSubstitutions(messages)}\x1b[0m`,
      ...convertObjectToString(messages),
    );
  }
  info<T>(...messages: T[]) {
    console.log(...messages);
  }
  draw<T>(
    messages: T[],
    textColor: TextColorType = 'default',
    backgroundColor: BackgroundColorType = 'default',
  ) {
    if (textColor === 'default' && backgroundColor === 'default') {
      console.log(...messages);
    } else if (textColor !== 'default' && backgroundColor !== 'default') {
      console.log(
        `${getSequenceWithTextColor(textColor)}${getSequenceWithBackgroundColor(
          backgroundColor,
        )}${getSubstitutions(messages)}${getResetSequence()}`,
        ...convertObjectToString(messages),
      );
    } else if (textColor !== 'default') {
      console.log(
        `${getSequenceWithTextColor(textColor)}${getSubstitutions(
          messages,
        )}${getResetSequence()}`,
        ...convertObjectToString(messages),
      );
    } else if (backgroundColor !== 'default') {
      console.log(
        `${getSequenceWithBackgroundColor(backgroundColor)}${getSubstitutions(
          messages,
        )}${getResetSequence()}`,
        ...convertObjectToString(messages),
      );
    }
  }
  debug<T>(...messages: T[]) {
    if (process.env.NODE_ENV !== 'production') {
      console.log(...messages);
    }
  }
}

export const log = new Logger();
