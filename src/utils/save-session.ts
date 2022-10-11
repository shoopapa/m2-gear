import { DataStore } from 'aws-amplify';
import { Session } from '../models';
import { LinearAccerationType, QuaternionType } from '../types/data-format';

export const saveSession = async (
  a: LinearAccerationType,
  q: QuaternionType,
  name?: string
) => {
  if (a[0].length === 0) {
    return null;
  }
  const input = new Session({
    name,
    linearAccerationTimestamp: a[0],
    linearAccerationX: a[1],
    linearAccerationY: a[2],
    linearAccerationZ: a[3],
    quaternionTimestamp: q[0],
    quaternionW: q[1],
    quaternionX: q[2],
    quaternionY: q[3],
    quaternionZ: q[4],
  });
  try {
    await DataStore.save(input);
  } catch (e) {
    console.warn('failed to save session, please try again');
    console.log(e);
  }
};
