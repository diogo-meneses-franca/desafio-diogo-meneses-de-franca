class CaixaDaLanchonete {


    calcularValorDaCompra(metodoDePagamento, itens) {
        let pedido = this.criaPedidoMap(itens)
        let cardapio = this.criarCardapioMap()
        let resultado
        
        if(this.temPrincipal(pedido)){
            resultado =  "Item extra não pode ser pedido sem o principal"
        }else if(pedido.size == 0){
            resultado =  "Não há itens no carrinho de compra!"
        }else if(this.itemVazio(pedido)){
            resultado =  "Quantidade inválida!"
        }else if(this.itemNaoExisteNoCardapio(cardapio, pedido)){
            resultado =  "Item inválido!"
        }else if(this.formaDePagamentoAceita(metodoDePagamento)){
            resultado =  "Forma de pagamento inválida!"
        }else{
            let total = this.calculaTotalDaCompra(cardapio, pedido, metodoDePagamento)
            resultado = `R$ ${total.toFixed(2).replace(".", ",")}`      
        }
        return  resultado          
    }


    criarCardapioMap(){
        let cardapioMap = new Map
        cardapioMap.set("cafe", 3.00)
        cardapioMap.set("chantily", 1.50)
        cardapioMap.set("suco",6.20)
        cardapioMap.set("sanduiche",6.50)
        cardapioMap.set("queijo",2.00)
        cardapioMap.set("salgado", 7.25)
        cardapioMap.set("combo1", 9.50)
        cardapioMap.set("combo2",7.50)
        return cardapioMap
    }
    
    criaPedidoMap(pedidoList){
        let pedidoMap = new Map()
        pedidoList.forEach((item)=> {
            let temporaria = item.split(",")
            pedidoMap.set(temporaria[0], Number.parseInt(temporaria[1]))
        })
        return pedidoMap
    }


    //CHECA SE O ITEM ADICIONAL POSSUI SEU PRINCIPAL
    temPrincipal(pedidoMap){
        let resultado = (
            (pedidoMap.has("queijo") && pedidoMap.has("sanduiche") == false)
         || (pedidoMap.has("chantily") && pedidoMap.has("cafe") == false)
         ) ? true : false
        return resultado
    }

    //CHECA SE A QUANTIDADE 0(ZERO) FOI ATRIBUÍDA A ALGUM ITEM DO PEDIDO
    itemVazio(itensMap){
        let resposta = false
        itensMap.forEach((key, value) =>{
            if(key == 0){
                resposta = true
            }
        })
        return resposta
    }

    //CHECA SE ALGUM ITEM DO PEDIDO NÃO ESTÁ PRESENTE NO CARDÁPIO
    itemNaoExisteNoCardapio(cardapio, itensMap){
        let resposta = false
        itensMap.forEach((key,value) =>{
            
            if(cardapio.has(value) == false){
                resposta = true
            }
        })
        return resposta
    }

    //CHECA SE A FORMA DE PAGAMENTO É ACEITA
    formaDePagamentoAceita(formaDePagamento){
        let formasDePagamentoAceitas = ["dinheiro","debito","credito"]
        let resposta = true
        for(let i = 0; i < formasDePagamentoAceitas.length; i++){
            if(formaDePagamento == formasDePagamentoAceitas[i]){
                resposta = false
            }
        }
        return resposta
    }

    calculaTotalDaCompra(cardapio, pedidoMap, metodoDePagamento){
        let total = 0
        pedidoMap.forEach((key,value)=>{
            console.log(`Key: ${key}, Value: ${value}`)
            total += (key * cardapio.get(value))
        })
        if(metodoDePagamento == "dinheiro" ){
            total = total - (total * 0.05)
        }else if(metodoDePagamento == "credito"){
            total = total + (total * 0.03)
        }
        return total
    }
    
    



}

export { CaixaDaLanchonete };
