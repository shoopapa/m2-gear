
import { DataStore } from 'aws-amplify';
import { Session, Tag, SessionTags } from '../../models';

export type SelectableTag = Tag & {isSelected?: boolean}

export const saveSession = async (acc: number[][], gyro:number[][], tags:Tag[], streamingStarted:number, streamingFreqency:number) => {
  const input = new Session({
    accerationX:  acc[0],
    accerationY:  acc[1],
    accerationZ:  acc[2],
    gyroX:  gyro[0],
    gyroY:  gyro[1],
    gyroZ:  gyro[2],
    streamingStarted,
    streamingFreqency
  })
  try { //might try converting to datastore, not sure if it benifits me much since this data isn't very editable
    const newSession = await DataStore.save(input)

    tags.forEach(tag => {
      DataStore.save(
        new SessionTags({
          session:newSession,
          tag
        })
      )
    })
  } catch (e) {
    console.warn('failed to save session, please try again')
    console.log(e)
  }
}

