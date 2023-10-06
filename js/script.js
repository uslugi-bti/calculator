"use strict"
const result = document.querySelector(".result>span");
const nums = document.querySelectorAll(".num");
const actions = document.querySelectorAll(".action");
const equal = document.querySelector(".equal");
const percent = document.querySelector(".percent");
const negate = document.querySelector(".negate");
const clear = document.querySelector(".clear");
const comma = document.querySelector(".comma");
const buttons = document.querySelectorAll(".container__item");
const audio = document.querySelector(".audio");

for (let i = 0; i < buttons.length; i++) {
	buttons[i].addEventListener("click", function () {
		audio.play();
	});
}

let firstValue = "";
let secondValue = "";
let actionValue = "";
let commas = "";
let percents = "";
for (let i = 0; i < nums.length; i++) {
	nums[i].addEventListener("click", function() {
		for (let i = 0; i < actions.length; i++) {
			actions[i].classList.remove("active");
		}
		clear.innerText = "C";
		if (actionValue === "") {
			if (this.innerText === "0" && String(firstValue).length === 0 && result.innerText === "0") {
				return;
			} else if (result.innerText === "Ошибка!" && this.innerText === "0") {
				result.innerText = "0";
			} else {
				firstValue += this.innerText;
				result.innerText = firstValue;
			}
		} else {
			if (result.innerText[result.innerText.length - 1] === "%") {
				return;
			} else if (String(secondValue).length === 1 && String(secondValue)[0] === "0") {
				secondValue = String(secondValue).slice(1);
				secondValue += this.innerText;
				result.innerText = secondValue;
			} else {
				secondValue += this.innerText;
				result.innerText = secondValue;
			}
		}
	});
}

for (let i = 0; i < actions.length; i++) {
	actions[i].addEventListener("click", function () {
		commas = "";
		clear.innerText = "C";
		for (let i = 0; i < actions.length; i++) {
			actions[i].classList.remove("active");
		}
		if (firstValue[firstValue.length - 1] === "." || result.innerText === "Ошибка!") {
			return;
		} else {
			this.classList.add("active");
		}
		if (firstValue !== "") {
			if (secondValue !== "") {
				if (actionValue === "+") {
					firstValue = parseFloat((Number(firstValue) + Number(secondValue)).toFixed(10));
					secondValue = "";
					actionValue = this.innerText;
					result.innerText = firstValue;
				} else if (actionValue === "-") {
					firstValue = parseFloat((Number(firstValue) - Number(secondValue)).toFixed(10));
					secondValue = "";
					actionValue = this.innerText;
					result.innerText = firstValue;
				} else if (actionValue === "÷") {
					if (secondValue === "0") {
						firstValue = "";
						secondValue = "";
						actionValue = "";
						result.innerText = "Ошибка!";
						for (let i = 0; i < actions.length; i++) {
							actions[i].classList.remove("active");
						}
					} else {
						firstValue = parseFloat((Number(firstValue) / Number(secondValue)).toFixed(10));
						secondValue = "";
						actionValue = this.innerText;
						result.innerText = firstValue;
					}
				} else if (actionValue === "×") {
					firstValue = parseFloat((Number(firstValue) * Number(secondValue)).toFixed(10));
					secondValue = "";
					actionValue = this.innerText;
					result.innerText = firstValue;
				}
			} else {
				actionValue = this.innerText;
			}
		} else {
			if (secondValue !== "") {
				if (actionValue === "+") {
					firstValue = parseFloat((0 + Number(secondValue)).toFixed(10));
					secondValue = "";
					actionValue = this.innerText;
					result.innerText = firstValue;
				} else if (actionValue === "-") {
					firstValue = parseFloat((0 - Number(secondValue)).toFixed(10));
					secondValue = "";
					actionValue = this.innerText;
					result.innerText = firstValue;
				} else if (actionValue === "÷") {
					if (secondValue === "0") {
						firstValue = "";
						secondValue = "";
						actionValue = "";
						result.innerText = "Ошибка!";
						for (let i = 0; i < actions.length; i++) {
							actions[i].classList.remove("active");
						}
					} else {
						firstValue = parseFloat((0 / Number(secondValue)).toFixed(10));
						secondValue = "";
						actionValue = this.innerText;
						result.innerText = firstValue;
					}
				} else if (actionValue === "×") {
					firstValue = parseFloat((0 * Number(secondValue)).toFixed(10));
					secondValue = "";
					actionValue = this.innerText;
					result.innerText = firstValue;
				}
			} else {
				actionValue = this.innerText;
			}
		}
	});
}
comma.addEventListener("click", function () {
	clear.innerText = "C";
	for (let i = 0; i < actions.length; i++) {
		actions[i].classList.remove("active");
	}
	if (actionValue === "") {
		if (firstValue.length === 0) {
			if (commas.length > 0) {
				return;
			} else {
				firstValue += "0.";
				commas += ".";
				result.innerText = firstValue;
			}
		} else {
			if (commas.length > 0) {
				return;
			} else {
				firstValue += ".";
				commas += ".";
				result.innerText = firstValue;
			}
		}
	} else {
		if (secondValue.length === 0) {
			if (commas.length > 0) {
				return;
			} else {
				secondValue += "0.";
				commas += ".";
				result.innerText = secondValue;
			}
		} else {
			if (commas.length > 0) {
				return;
			} else if (result.innerText[result.innerText.length - 1] === "%") {
				return;
			} else {
				secondValue += ".";
				commas += ".";
				result.innerText = secondValue;
			}
		}
	}
});
negate.addEventListener("click", function () {
	if (actionValue === "") {
		if (firstValue !== "") {
			if (firstValue[firstValue.length - 1] === ".") {
				return;
			} else {
				firstValue = -firstValue;
				result.innerText = firstValue;
			}
		} else {
			return;
		}
	} else {
		if (secondValue !== "") {
			if (secondValue[secondValue.length - 1] === ".") {
				return;
			} else {
				if (result.innerText[result.innerText.length - 1] === "%") {
					result.innerText = "-" + result.innerText;
					secondValue = -secondValue;
				} else {
					secondValue = -secondValue;
					result.innerText = secondValue;
				}
			}
		} else {
			return;
		}
	}
});
percent.addEventListener("click", function () {
	if (actionValue === "") {
		return;
	} else {
		if (secondValue !== "") {
			if (secondValue[secondValue.length - 1] === ".") {
				return;
			} else {
				if (percents.length > 0) {
					return;
				} else {
					if (actionValue === "+" || actionValue === "-") {
						secondValue += "%";
						percents += "%";
						result.innerText = secondValue;
						secondValue = (firstValue * (secondValue.slice(0, secondValue.length - 1))) / 100;
						secondValue = String(secondValue);
					} else {
						secondValue += "%";
						percents += "%";
						result.innerText = secondValue;
						secondValue = (secondValue.slice(0, secondValue.length - 1)) / 100;
						secondValue = String(secondValue);
					}
				}
			}
		} else {
			return;
		}
	}
});
equal.addEventListener("click", function () {
	for (let i = 0; i < actions.length; i++) {
		actions[i].classList.remove("active");
	}
	if (actionValue === "+") {
		if (secondValue === "") {
			firstValue = parseFloat((Number(firstValue) + Number(firstValue)).toFixed(10));
			secondValue = "";
			actionValue = "";
			if (firstValue === 0) {
				firstValue = "";
				result.innerText = "0";
			} else {
				result.innerText = firstValue;
			}
		} else {
			firstValue = parseFloat((Number(firstValue) + Number(secondValue)).toFixed(10));
			secondValue = "";
			actionValue = "";
			if (firstValue === 0) {
				firstValue = "";
				result.innerText = "0";
			} else {
				result.innerText = firstValue;
			}
		}
	} else if (actionValue === "-") {
		if (secondValue === "") {
			firstValue = parseFloat((Number(firstValue) - Number(firstValue)).toFixed(10));
			secondValue = "";
			actionValue = "";
			if (firstValue === 0) {
				firstValue = "";
				result.innerText = "0";
			} else {
				result.innerText = firstValue;
			}
		} else {
			firstValue = parseFloat((Number(firstValue) - Number(secondValue)).toFixed(10));
			secondValue = "";
			actionValue = "";
			if (firstValue === 0) {
				firstValue = "";
				result.innerText = "0";
			} else {
				result.innerText = firstValue;
			}
		}
	} else if (actionValue === "÷") {
		if (secondValue === "") {
			if (firstValue === "0" || result.innerText === "0") {
				firstValue = "";
				secondValue = "";
				actionValue = "";
				result.innerText = "Ошибка!";
				for (let i = 0; i < actions.length; i++) {
					actions[i].classList.remove("active");
				}
			} else {
				firstValue = parseFloat((Number(firstValue) / Number(firstValue)).toFixed(10));
				secondValue = "";
				actionValue = "";
				if (firstValue === 0) {
					firstValue = "";
					result.innerText = "0";
				} else {
					result.innerText = firstValue;
				}
			}
		} else {
			if (secondValue === "0") {
				firstValue = "";
				secondValue = "";
				actionValue = "";
				result.innerText = "Ошибка!";
				for (let i = 0; i < actions.length; i++) {
					actions[i].classList.remove("active");
				}
			} else {
				firstValue = parseFloat((Number(firstValue) / Number(secondValue)).toFixed(10));
				secondValue = "";
				actionValue = "";
				if (firstValue === 0) {
					firstValue = "";
					result.innerText = "0";
				} else {
					result.innerText = firstValue;
				}
			}
		}
	} else if (actionValue === "×") {
		if (secondValue === "") {
			firstValue = parseFloat((Number(firstValue) * Number(firstValue)).toFixed(10));
			actionValue = "";
			if (firstValue === 0) {
				firstValue = "";
				result.innerText = "0";
			} else {
				result.innerText = firstValue;
			}
		} else {
			firstValue = parseFloat((Number(firstValue) * Number(secondValue)).toFixed(10));
			secondValue = "";
			actionValue = "";
			if (firstValue === 0) {
				firstValue = "";
				result.innerText = "0";
			} else {
				result.innerText = firstValue;
			}
		}
	}
});
clear.addEventListener("click", function () {
	firstValue = "";
	secondValue = "";
	actionValue = "";
	commas = "";
	percents = "";
	result.innerText = "0";
	clear.innerText = "AC";
	for (let i = 0; i < actions.length; i++) {
		actions[i].classList.remove("active");
	}
});