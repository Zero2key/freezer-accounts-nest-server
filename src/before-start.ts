import { createConnection } from 'typeorm';
import { MaterielType } from './materiel-types/materiel-types.entity';

export async function beforeStart() {
  const connection = await createConnection({
    type: 'sqlite',
    database: 'store.db',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  });
  const mts = await connection.manager.findAndCount(MaterielType);
  if (mts[1] === 0) {
    await connection.manager.transaction(async entityManager => {
      const materielTypeRepository = entityManager.getRepository(MaterielType);
      await materielTypeRepository.insert({ code: 'DOOR', label: '门' });
      await materielTypeRepository.insert({ code: 'BOARD', label: '板' });
      await materielTypeRepository.insert({ code: 'PARTS', label: '配件' });
    });
  }
  await connection.close();
}

beforeStart();
