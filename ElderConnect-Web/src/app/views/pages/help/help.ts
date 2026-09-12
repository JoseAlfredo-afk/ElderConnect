import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './help.html',
  styles: [`
    .btn-hover-opacity {
      transition: opacity 0.3s ease;
    }
    .btn-hover-opacity:hover {
      opacity: 0.85; 
    }
  `]
})
export class Help {
  faqs = [
    {
      pergunta: 'Como faço para buscar e vincular um cuidador?',
      resposta: 'Navegue até a aba "Buscar cuidador" no menu lateral. Lá, você pode filtrar os profissionais por cidade, valor e experiência. Ao encontrar o cuidador ideal, clique em "Ver perfil" e depois no botão "Solicitar Vínculo".'
    },
    {
      pergunta: 'Como funciona a aba de Medicamentos?',
      resposta: 'Na tela de "Medicamentos", você pode cadastrar todos os remédios do idoso, informando dosagem, horário e instruções. Esses dados serão exibidos na sua tela inicial (Home) para facilitar o controle diário.'
    },
    {
      pergunta: 'Posso avaliar o serviço de um cuidador?',
      resposta: 'Sim! Após firmar um vínculo, vá até a sua Home. No card do "Cuidador Contratado", clique em "Avaliar Cuidador". Você poderá atribuir de 1 a 5 estrelas e deixar um comentário. A média do profissional será atualizada automaticamente.'
    },
    {
      pergunta: 'Como encerro o contrato com um cuidador?',
      resposta: 'Na sua página inicial (Home), logo abaixo das informações do cuidador contratado, existe o botão "Encerrar Vínculo". Ao clicar, o vínculo é desfeito e você fica livre para buscar um novo profissional.'
    }
  ];

  contatosSuporte = [
    '5535997611209',
    '5535999356444',
    '5535991910755'
  ];

  falarComSuporte(): void {
    const indiceAleatorio = Math.floor(Math.random() * this.contatosSuporte.length);
    const numeroSorteado = this.contatosSuporte[indiceAleatorio];

    const mensagem = encodeURIComponent('Olá, equipe ElderConnect! Preciso de ajuda com o sistema.');

    const url = `https://wa.me/${numeroSorteado}?text=${mensagem}`;

    window.open(url, '_blank');
  }
}