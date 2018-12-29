var original_color;
        var flag = 0;

        var map = {
            'zero': '0',
            'one': '1',
            'two': '2',
            'three': '3',
            'four': '4',
            'five': '5',
            'six': '6',
            'seven': '7',
            'eight': '8',
            'nine': '9',
            'add': '+',
            'subtract': '-',
            'multiply': '*',
            'divide': '/',
            'decimal': '.'
        };

        function changebg(id, status) {
            var e = document.getElementById(id);
            if (status == 0) {
                original_color = e.style.backgroundColor;
                e.style.backgroundColor = 'orange';
            } else {
                e.style.backgroundColor = original_color;
            }
        }

        function process(html, char) {
            var e = html[html.length - 1];
            var nums = "0123456789.";
            var symbols = "+-*/"

            var ans;

            var s1, s2;

            s1 = (nums.indexOf(e) >= 0);
            s2 = (nums.indexOf(char) >= 0);

            if (s1 || (!s1 && s2)) {
                if ((html.length == 1) && (e == "0")) {
                    ans = char;
                } else if ((html.length == 1) && (e == "0") && (char == ".")) {
                    ans = html + char;
                } else {
                    if (char == "." && flag == 1) {
                        ans = html;
                    } else {
                        if (!s2) {
                            flag = 0;
                        } else if (char == ".") {
                            flag = 1;
                        }
                        ans = html + char;
                    }
                }
            } else if (!s1 && !s2) {
                var arr = html.split('');
                arr.pop();
                arr.push(char);
                ans = arr.join('');
            } else {
                var arr = html.split('');
                arr.pop();
                ans = arr.join('');
            }
            return ans;
        }

        function calculate() {
            var e = document.getElementById("display").innerText;

            var operands = e.split(/[-+/*/]/g);

            var symbols = "+-*/"

            var operations = [];

            for (let i = 0; i < e.length; i++) {
                if (symbols.indexOf(e[i]) != -1) {
                    operations.push(e[i]);
                }
            }

            for (let i = 0; i < operands.length; i++) {
                operands[i] = parseFloat(operands[i]);
            }

            while (operations.length != 0) {
                var op1 = operands.shift();
                var op2 = operands.shift();
                switch (operations[0]) {
                    case "+":
                        operands.unshift((op1 + op2));
                        break;
                    case "-":
                        operands.unshift((op1 - op2));
                        break;
                    case "*":
                        operands.unshift((op1 * op2));
                        break;
                    case "/":
                        operands.unshift((op1 / op2));
                        break;
                    default:
                        break;
                }
                operations.shift();
            }

            return operands[0];
        }

        function handle(id) {
            var status = 0;
            var e = document.getElementById("display");
            if (id === "clear") {
                flag = 0;
                e.innerHTML = "0";
            } else if (id === "equals") {
                var ans = calculate();
                e.innerHTML = ans;
                flag = 0;
                status = 1;
            } else {
                if (status == 1) {
                    flag = 0;
                    e.innerHTML = "0";
                }
                e.innerHTML = process(e.innerHTML, map[id]);
            }
        }