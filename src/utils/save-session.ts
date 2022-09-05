import { DataStore } from "aws-amplify";
import { Session, Tag, SessionTags } from "../models";
import { linearAccerationType, QuaternionType } from '../types/data-format';

export type SelectableTag = Tag & { isSelected?: boolean };

export const saveSession = async (
  a: linearAccerationType,
  q: QuaternionType,
  tags: Tag[],
) => {
  const input = new Session({
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
    //might try converting to datastore, not sure if it benifits me much since this data isn't very editable
    const newSession = await DataStore.save(input);

    tags.forEach((tag) => {
      DataStore.save(
        new SessionTags({
          session: newSession,
          tag,
        })
      );
    });
  } catch (e) {
    console.warn("failed to save session, please try again");
    console.log(e);
  }
};
