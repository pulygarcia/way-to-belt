import { DataSource, EntitySubscriberInterface, EventSubscriber, UpdateEvent } from "typeorm"
import { Fight } from "../entities/fight.entity"
import { FightStatus } from "src/types/fight";

@EventSubscriber()
export class FightSubscriber implements EntitySubscriberInterface<Fight> {
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this);
    }
    /**
     * Indicates that this subscriber only listen to Fight events.
     */
    listenTo() {
        return Fight
    }

    /**
     * Called after fight update.
     */
    async afterUpdate(event: UpdateEvent<Fight>) {
       if(event.entity!.status === FightStatus.FINALIZED && event.databaseEntity.status !== FightStatus.FINALIZED) {
          const fighterRepo = event.manager.getRepository('Fighter');

          //increment wins and losses
          if(event.entity!.winner) {
            await fighterRepo.increment({id: event.entity!.winner.id}, 'wins', 1);

            const loserId = event.entity!.fighterA.id === event.entity!.winner.id ? event.entity!.fighterB.id : event.entity!.fighterA.id;
            await fighterRepo.increment({id: loserId}, 'losses', 1);
          }
       }
    }
    
}