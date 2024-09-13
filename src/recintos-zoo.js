class RecintosZoo {
  recintosExistentes = [
    {
      num: 1,
      bioma: 'Savana',
      tamTotal: 10,
      animaisExistentes: [{ especie: 'Macaco', quantidade: 3 }],
    },
    { num: 2, bioma: 'Floresta', tamTotal: 5, animaisExistentes: [] },
    {
      num: 3,
      bioma: 'Savana e Rio',
      tamTotal: 7,
      animaisExistentes: [{ especie: 'Gazela', quantidade: 1 }],
    },
    { num: 4, bioma: 'Rio', tamTotal: 8, animaisExistentes: [] },
    {
      num: 5,
      bioma: 'Savana',
      tamTotal: 9,
      animaisExistentes: [{ especie: 'Leao', quantidade: 1 }],
    },
  ];

  animais = [
    { especie: 'Leao', tam: 3, bioma: ['Savana'], classificacao: 'Carnivoro' },
    {
      especie: 'Leopardo',
      tam: 2,
      bioma: ['Savana'],
      classificacao: 'Carnivoro',
    },
    {
      especie: 'Crocodilo',
      tam: 3,
      bioma: ['Rio'],
      classificacao: 'Carnivoro',
    },
    {
      especie: 'Macaco',
      tam: 1,
      bioma: ['Floresta', 'Savana'],
      classificacao: 'Onivoro',
    },
    {
      especie: 'Gazela',
      tam: 2,
      bioma: ['Savana'],
      classificacao: 'Herbivoro',
    },
    {
      especie: 'Hipopotamo',
      tam: 4,
      bioma: ['Savana', 'Rio'],
      classificacao: 'Herbivoro',
    },
  ];

  analisaRecintos(animal, quantidade) {
    const animalInfo = animais.find(
      (a) => a.especie.toUpperCase() === animal.toUpperCase(),
    );
    if (!animalInfo) {
      return { erro: 'Animal Inválido' };
    }
    if (isNaN(quantidade) || quantidade <= 0) {
      return { erro: 'Quantidade Inválida' };
    }

    const recintosViaveis = [];

    recintosExistentes.forEach((recinto) => {
      const biomasRecinto = recinto.bioma.split(' e ');

      if (
        animalInfo.bioma.some((biomaAnimal) =>
          biomasRecinto.includes(biomaAnimal),
        )
      ) {
        let espacoLivre = recinto.tamTotal;
        let erro = false;
        const animaisRecinto = recinto.animaisExistentes;

        animaisRecinto.forEach((animalPresente) => {
          const animalExistenteInfo = animais.find(
            (a) => a.especie === animalPresente.especie,
          );
          espacoLivre -= animalExistenteInfo.tam * animalPresente.quantidade;
        });

        if (animalInfo.classificacao === 'Carnivoro') {
          if (
            animaisRecinto.length > 0 &&
            animaisRecinto.some((a) => a.especie !== animalInfo.especie)
          ) {
            erro = true;
          }
        } else if (animalInfo.especie === 'Macaco') {
          if (animaisRecinto.length === 0) {
            erro = true;
          }
        } else if (animalInfo.especie === 'Hipopotamo') {
          if (
            !biomasRecinto.includes('Savana') ||
            !biomasRecinto.includes('Rio')
          ) {
            erro = true;
          }
        }

        if (!erro && espacoLivre >= quantidade * animalInfo.tam) {
          if (animaisRecinto.length > 0) {
            espacoLivre -= 1;
          }
          espacoLivre -= quantidade * animalInfo.tam;
          recintosViaveis.push(
            `Recinto ${recinto.num} (espaço livre: ${espacoLivre}, tamanho total: ${recinto.tamTotal})`,
          );
        }
      }
    });

    if (recintosViaveis.length === 0) {
      return { erro: 'Não há recintos viáveis' };
    }

    return { recintosViaveis };
  }
}
export { RecintosZoo as RecintosZoo };
