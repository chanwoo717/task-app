<template>
    <div class="calc-sect" @keydown="handleKeyDown">
        <h1 style="color: white;">Calculator App</h1>
        <div class="result-sect">
            <DisplayScreen v-if="currentInput !== null" :value="currentInput"></DisplayScreen>
            <DisplayScreen v-else :value="0"></DisplayScreen>
        </div>
        <div class="buttons">
            <button v-for="button in buttons" :key="button.value" @click="handleButtonClick(button.value)"
                class="each-btn"> {{ button.label }} </button>
        </div>
    </div>
</template>
<script>
import DisplayScreen from './DisplayScreen.vue';

export default {
    name: 'CalcApp',
    components: {
        DisplayScreen
    },
    data() {
        return {
            currentInput: '',
            isOpeningParenthesis: false,

        };
    },
    methods: {
        handleButtonClick(value) {
            if (value === '=') {
                this.calculate();
            } else if (value === 'C') {
                this.clear();
            } else if (value === 'Del' && this.currentInput) {
                this.currentInput = this.currentInput.substr(0,this.currentInput.length-1)
            } else if (value === '()') {
                if (this.isOpeningParenthesis) {
                    this.currentInput += ')';
                } else {
                    this.currentInput += '(';
                }
                this.isOpeningParenthesis = !this.isOpeningParenthesis;
            } else {
                if (this.currentInput === null || this.currentInput === '0' || (typeof this.currentInput === 'number' && this.currentInput === 0)) {
                    this.currentInput = value;
                } else {
                    this.currentInput += value;
                }
            }
        },
        handleKeyDown(event) {
            const key = event.key;
            if (
                key >= '0' && key <= '9' || ['+', '-', '*', '/', '.', '=', 'Enter', 'Backspace', 'Escape', '(', ')'].includes(key)
            ) {
                if (key === 'Enter' || key === '=') {
                    this.calculate();
                } else if (key === 'Backspace' || key === 'Escape') {
                    this.clear();

                } else if (key === '(') {
                    if (this.isOpeningParenthesis) {
                        this.currentInput += ')';
                    } else {
                        this.currentInput += '(';
                    }
                    this.isOpeningParenthesis = !this.isOpeningParenthesis;
                } else {
                    if (this.currentInput === null || this.currentInput === '0' || (typeof this.currentInput === 'number' && this.currentInput === 0)) {
                        this.currentInput = key;
                    } else {
                        this.currentInput += key;
                    }
                }
            }
        },
        calculate() {
            try {
                this.currentInput = eval(this.currentInput);
            } catch (error) {
                this.currentInput = 'Error';
            }
        },
        clear() {
            this.currentInput = '';
            this.isOpeningParenthesis = false;
        }

    },

    computed: {
        buttons() {
            return [
                { label: 'C', value: 'C' },
                { label: '( )', value: '()' },
                { label: '%', value: '%' },
                { label: '+', value: '+' },
                { label: '7', value: '7' },
                { label: '8', value: '8' },
                { label: '9', value: '9' },
                { label: '-', value: '-' },
                { label: '4', value: '4' },
                { label: '5', value: '5' },
                { label: '6', value: '6' },
                { label: '*', value: '*' },
                { label: '1', value: '1' },
                { label: '2', value: '2' },
                { label: '3', value: '3' },
                { label: '/', value: '/' },
                { label: 'Del', value: 'Del' },
                { label: '0', value: '0' },
                { label: '.', value: '.' },
                { label: '=', value: '=' },
            ];
        }
    }
}

</script>
<style lang="scss" scoped>
h1 {
    margin-top: 0;
    margin-bottom: 50px;
}

.calc-sect {
    position: relative;
    width: 768px;
    height: 90%;
    margin: 2rem auto 0;
    border-radius: 20px;
    padding: 2rem 0;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px rgba(0, 0, 0, 0.19);
    background-color: #212730;
}

.result-sect {
    width: 100%;

}

.buttons {
    position: absolute;
    bottom: 40px;
    left: 5%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3px;
    padding: 0 40px;
    width: 80%;
}

.each-btn {
    background-color: #4481bd;
    font-size: 1.75rem;
    width: 100%;
    height: 60px;
    margin: 0 auto;
    border-radius: 50px;
    border: none;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.8);
}

.each-btn:nth-of-type(1){
    background-color: rgb(172, 172, 172);
}
.each-btn:nth-of-type(2){
    background-color: rgb(230, 168, 0);
}
.each-btn:nth-of-type(3){
    background-color: rgb(230, 168, 0);
}
.each-btn:nth-of-type(4n){
    background-color: rgb(230, 168, 0);
}
.each-btn:nth-of-type(17){
    background-color: rgb(172, 172, 172);
}


</style>