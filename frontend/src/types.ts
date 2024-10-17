// types.ts
export interface Mesa {
  id: string; // O el tipo que corresponda
  numero: number;
}

// Si quieres que onNewMesa acepte un objeto que no tenga id, crea un nuevo tipo
export type MesaWithoutId = Omit<Mesa, "id">; // Este tipo no tendrá la propiedad 'id'
