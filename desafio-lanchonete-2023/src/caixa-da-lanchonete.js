class CaixaDaLanchonete {
  calcularValorDaCompra(formaDePagamento, itens) {
    const cardapio = {
      cafe: { descricao: "Café", valor: 3.00 },
      chantily: { descricao: "Chantily", valor: 1.50 },
      suco: { descricao: "Suco Natural", valor: 6.20 },
      sanduiche: { descricao: "Sanduíche", valor: 6.50 },
      queijo: { descricao: "Queijo", valor: 2.00 },
      salgado: { descricao: "Salgado", valor: 7.25 },
      combo1: { descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
      combo2: { descricao: "1 Café e 1 Sanduíche", valor: 7.50 },
    };

    const formasDePagamento = ["dinheiro", "debito", "credito"];

    if (!formasDePagamento.includes(formaDePagamento)) { 
      return "Forma de pagamento inválida!";
    }

    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valorTotal = 0;
    let mensagemErro = "";
    
    for (const item of itens) {
      const [codigo, quantidade] = item.split(","); 
      const menuItem = cardapio[codigo]; 

      if (!menuItem) {
        mensagemErro = "Item inválido!";
        break;
      }

      if (quantidade == 0) {
        mensagemErro = "Quantidade inválida!";
        break;
      }

      if (codigo === "chantily" || codigo === "queijo") {
        const itemPrincipal = codigo === "chantily" ? "cafe" : "sanduiche";
    
        const itemPrincipalEncontrado = itens.find(item => item.startsWith(itemPrincipal));
        if (!itemPrincipalEncontrado) {
          mensagemErro = "Item extra não pode ser pedido sem o principal";
          break;
        }
      }

      valorTotal += menuItem.valor * quantidade;
    }

    if (mensagemErro) {
      return mensagemErro;
    }

    if (formaDePagamento === "dinheiro") {
      valorTotal *= 0.95; 
    } else if (formaDePagamento === "credito") {
      valorTotal *= 1.03; 
    }

    const valorFormatado = valorTotal.toFixed(2).replace(".", ",");
    return `R$ ${valorFormatado}`;
  }
}

export { CaixaDaLanchonete };
