import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { DatabaseService } from '../database/database.service';
import { ExportPoint } from 'lib/interfaces/run.interfaces';

@Injectable()
export class RunService {
  constructor(
    @Inject('INFLUX_SERVICE')
    private influxProxy: ClientProxy,

    private prisma: DatabaseService,
  ) {}

  async getRuns(bucket_id: string): Promise<any> {
    return this.influxProxy.send('get_runs', bucket_id);
  }

  async writeRuns(data: ExportPoint[], user_id: string): Promise<any> {
    console.log('userId', user_id);

    // Vérifiez que data[0] et data[data.length - 1] existent pour éviter les erreurs de runtime
    if (data.length === 0) {
      throw new Error('Data array is empty.');
    }

    const userExists = await this.prisma.user.findUnique({
      where: { uuid: user_id },
    });

    if (!userExists) {
      throw new Error(`User with ID ${user_id} does not exist.`);
    }

    // Assurez-vous que `timestamp` est un nombre (millisecondes UNIX) ou une string ISO valide
    const startTimestamp = new Date(data[0].timestamp).toISOString();
    const endTimestamp = new Date(data[data.length - 1].timestamp).toISOString();

    // ...
    const runParams = {
      start_run: startTimestamp,
      end_run: endTimestamp,
      usersUuid: user_id, // Add the missing usersUuid property
    };

    // Sauvegarde des métadonnées de la course dans PostgreSQL
    let new_run = await this.prisma.run.create({ data: runParams });

    // Préparation de l'objet run pour l'envoi à InfluxDB
    const run = {
      id: new_run.uuid, // Assurez-vous que cette ID est unique ou générée d'une manière qui convient à votre application
      userId: user_id,
      runId: new_run.uuid, // Même remarque que pour 'id'
      points: data,
    };

    this.influxProxy.send('write_runs', run).subscribe({
      next: result => {
        console.log('InfluxDB write result:', result);
      },
    });
    // Envoi des données de la course à InfluxDB via influxProxy
    return new_run;
  }
}
