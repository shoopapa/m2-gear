import { DataStore } from 'aws-amplify';
import { Section } from 'react-native-paper/lib/typescript/components/List/List';
import { Session, SessionSection } from '../models';
import { LinearAccerationType, QuaternionType } from '../types/data-format';

export type simpleSection = {start?:number, end?:number}
export const saveSession = async (
  a: LinearAccerationType,
  q: QuaternionType,
  name?: string,
  sections?: simpleSection[]
) => {
  if (a[0].length === 0) {
    return null;
  }
  try {
    const proms = []

    const session = new Session({
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
    proms.push(DataStore.save(session));

    if (sections !== undefined) {
      sections.forEach(s=>{
        const {start,end} = s
        if (end === undefined || start === undefined) return;
        const section = new SessionSection({start, end, sessionId: session.id})
        proms.push(DataStore.save(section))
      })
      proms.push()
    }

    return await Promise.all(proms)

  } catch (e) {
    console.warn('failed to save session, please try again');
    console.log(e);
  }
};
