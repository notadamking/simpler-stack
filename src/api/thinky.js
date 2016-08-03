import thinky from 'thinky';
import config from '../config';

const Thinky = thinky(config.rethinkDB);

export default Thinky;
