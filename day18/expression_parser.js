// https://blog.abelotech.com/posts/split-string-into-tokens-javascript/

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
//https://en.wikipedia.org/wiki/Shunting-yard_algorithm

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error

const PRECEDENCE = {'+': 1, '*' :0}

function apply(operator, operand_a, operand_b){
    switch (operator){
        case '+' : 
            return operand_a + operand_b
        case '*' :
            return operand_a * operand_b
        default:
            throw new Error(`Unsupported operator ${operator}`);
    }
}

function tokenize_math(expr){
    return expr.match(/[\(\)\+\*]|(?:\-?\d+)/g)
}

function infix_to_postfix(tokens) {
    let [out, op] = [[],[]]
    tokens.forEach((token) => {
        // console.log(out)
        if (/\-?\d+/.test(token)) {
            out.push(token)
        } else if (/[\+\*]/.test(token)){
            while(op.length > 0 
                 && op[op.length-1] != '(' 
                 && (PRECEDENCE[op[op.length-1]] >= PRECEDENCE[token])
                ){
                out.push(op.pop())
            }
            op.push(token)
        }
        else if (token == "(") {
            op.push(token)
        }
        else if (token == ")"){
            while(op.length > 0 && op[op.length-1] != '(')
                out.push(op.pop())
            if (!op) //no matching left paren
                throw new Error('Missing left paren')
            op.pop()
        }
    });
    while (op.length > 0){
        if (op[op.length-1] == '(') throw new Error('Missing right paren');
        out.push(op.pop())
    }

    return out;
}

function evaluate_postfix(tokens) {
    let out = []
    tokens.forEach((token) => {
        if (/\-?\d+/.test(token))
            out.push(token)
        else {
            if (out.length >= 2)
                out.push(apply(token, Number(out.pop()), Number(out.pop())))
            else 
                throw new Error('Not enough operands / too many operators')
        }
    });
    if (out.length > 1)
        throw new Error('Not enough operands / too many operators')
    return out[0]
}

function evaluate_math(expr) {
    const tokens = tokenize_math(expr)
    // console.log(tokens)
    const postfix_tokens = infix_to_postfix(tokens)
    // console.log(postfix_tokens)
    return evaluate_postfix(postfix_tokens)
}

module.exports = {
    evaluate_postfix: evaluate_postfix,
    infix_to_postfix: infix_to_postfix,
    tokenize_math: tokenize_math,
    evaluate_math: evaluate_math
 }