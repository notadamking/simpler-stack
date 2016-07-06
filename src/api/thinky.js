import 'babel-polyfill';
import thinky from 'thinky';
import { wrap, repeat } from 'lodash';
import config from '../config';

const Thinky = thinky(config.rethinkDB);

/**
 * Console log queries executed
 * in development mode
 */
export function bindLogger() {
  if (process.env.NODE_ENV !== 'production') {
    Thinky.r._Term.prototype.run = wrap(Thinky.r._Term.prototype.run, (func) => {
      const queryToString = this.toString();
      const lines = 100;
      const trailingArguments = [].slice.call(arguments, 1);

      console.info(`START${repeat('-', lines)}`);
      console.info(queryToString);
      console.info(`END${repeat('-', lines + 2)}`);
      console.log('');

      return func.apply(this, trailingArguments);
    });
  }
}

export default Thinky;
