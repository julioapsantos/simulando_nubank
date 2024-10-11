class Conta {
    constructor(numero, nome, saldo) {
        this.numero = numero;
        this.nome = nome;
        this.saldo = saldo;
    }
}

class Banco {
    constructor() {
        this.numeroConta = 1000;
        this.contas = [];
    }

    gerarNumeroConta() {
        this.numeroConta += 1;
        return this.numeroConta;
    }

    criarConta(nome) {
        const novoNumeroConta = this.gerarNumeroConta();
        const novaConta = new Conta(novoNumeroConta, nome, 0);
        this.contas.push(novaConta);
        return novaConta;
    }

    depositar(numeroConta, valor) {
        const conta = this.contas.find(c => c.numero === numeroConta);
        if (!conta) {
            alert("Conta não encontrada");
            return;
        }
        conta.saldo += valor;
        alert(`Depósito realizado! Saldo atual: R$ ${conta.saldo}`);
        this.atualizarSaldoConta(conta.saldo);
    }

    sacar(numeroConta, valor) {
        const conta = this.contas.find(c => c.numero === numeroConta);
        if (!conta) {
            alert("Conta não encontrada");
            return;
        }
        if (conta.saldo < valor) {
            alert("Saldo insuficiente");
            return;
        }
        conta.saldo -= valor;
        alert(`Saque realizado! Saldo atual: R$ ${conta.saldo}`);
        this.atualizarSaldoConta(conta.saldo);
    }

    consultarSaldo(numeroConta) {
        const conta = this.contas.find(c => c.numero === numeroConta);
        if (!conta) {
            alert("Conta não encontrada");
            return;
        }
        alert(`Saldo atual: R$ ${conta.saldo}`);
    }

    listarContas() {
        return this.contas;
    }

    atualizarSaldoConta(saldo) {
        document.getElementById('valor-saldo').textContent = `R$ ${saldo.toFixed(2)}`;
    }
}

const banco = new Banco();

// Criar conta na inicialização
const nomeTitular = prompt("Digite o nome do titular da conta:");
if (nomeTitular) {
    const contaCorrente = banco.criarConta(nomeTitular);
    alert(`Conta criada com sucesso! Número da conta: ${contaCorrente.numero}`);
} else {
    alert("Nome do titular não pode ser vazio.");
}

// Manipulação dos botões na interface
document.getElementById('botao-depositar').addEventListener('click', function() {
    const valorDeposito = parseFloat(prompt("Digite o valor que quer depositar:"));
    if (valorDeposito && valorDeposito > 0) {
        banco.depositar(contaCorrente.numero, valorDeposito);
    } else {
        alert("Valor inválido.");
    }
});

document.getElementById('botao-transferir').addEventListener('click', function() {
    const valorTransferencia = parseFloat(prompt("Digite o valor que quer transferir:"));
    if (valorTransferencia && valorTransferencia > 0) {
        banco.sacar(contaCorrente.numero, valorTransferencia);
    } else {
        alert("Valor inválido.");
    }
});

document.getElementById('botao-emprestimo').addEventListener('click', function() {
    alert("Funcionalidade de pegar emprestado em desenvolvimento.");
});

document.getElementById('botao-pix').addEventListener('click', function() {
    alert("Funcionalidade de Pix em desenvolvimento.");
});

document.getElementById('botao-pagar').addEventListener('click', function() {
    alert("Funcionalidade de pagamento em desenvolvimento.");
});

// Mostrar/Ocultar saldo
let saldoVisivel = true;
document.getElementById('botao-olho').addEventListener('click', function() {
    saldoVisivel = !saldoVisivel;
    const saldoContaElement = document.getElementById('valor-saldo');
    if (saldoVisivel) {
        saldoContaElement.style.visibility = 'visible';
        this.src = '/img/olho.png';  // Ícone de olho aberto
    } else {
        saldoContaElement.style.visibility = 'hidden';
        this.src = '/img/olho-fechado.png';  // Ícone de olho fechado
    }
});
