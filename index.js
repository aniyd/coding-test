const accountBalanceHistory = [
    {
        monthNumber: 0, // current month
        account: {
            balance: { amount: 0 },
        },
    },
    {
        monthNumber: 1, // last month
        account: {
            balance: { amount: 150 },
        },
    },
    {
        monthNumber: 2, // two months ago
        account: {
            balance: { amount: 200 },
        },
    }
];

function init(accountBalanceHistory) {
    if (Array.isArray(accountBalanceHistory)) {
        validateEachIndexData(accountBalanceHistory);
    } else {
        console.log(`Invalid data provided for ${accountBalanceHistory}.`);
    }
}

function validateEachIndexData(accountBalanceHistory) {
    for (let i = 0; i < accountBalanceHistory.length; i++) {
        if (typeof accountBalanceHistory[i] === 'object' &&
            !Array.isArray(accountBalanceHistory[i]) &&
            accountBalanceHistory[i] !== null) {
            if (Object.keys(accountBalanceHistory[i]).length !== 2) {
                console.log(`Each month balance history must have two ` +
                    `keys(monthNumber, account) only.`);
                break;
            } else {
                if (isNaN(accountBalanceHistory[i].monthNumber)) {
                    console.log(`Month number must be numberic`);
                    break;
                }

                if (!accountBalanceHistory[i].account ||
                    !accountBalanceHistory[i].account.balance ||
                    isNaN(accountBalanceHistory[i].account.balance.amount)) {
                    console.log(`account data is isvalid`);
                    break;
                }
            }

            if (accountBalanceHistory.length === i + 1) {
                accountTypeChecker(accountBalanceHistory);
            }
        } else {
            console.log(`Invalid data provided for ${accountBalanceHistory}`);
            break;
        }
    }
}

function accountTypeChecker(accountBalanceHistory) {
    let monthToAmountMap = new Map();
    let maxMonth = 0;
    for (let i = 0; i < accountBalanceHistory.length; i++) {
        if (monthToAmountMap.has(accountBalanceHistory[i].monthNumber)) {
            console.log(`repeated value for same month ${accountBalanceHistory[i].monthNumber}`);
            break;
        } else {
            if (maxMonth < parseInt(accountBalanceHistory[i].monthNumber)) {
                maxMonth = parseInt(accountBalanceHistory[i].monthNumber);
            }
            monthToAmountMap.set(
                accountBalanceHistory[i].monthNumber, accountBalanceHistory[i].account.balance.amount
            );
        }
    }

    let monthlyTrack = new Array(maxMonth + 1);
    monthlyTrack.fill(-1);
    for (let i = 0; i < monthlyTrack.length; i++) {
        if (monthToAmountMap.has(i)) {
            monthlyTrack[i] = monthToAmountMap.get(i);
        }
    }
    if (accountBalanceHistory.length == 1 && monthlyTrack[0] != -1) {
        console.log('TYPE B');
    } else {
        let diff = -1;
        if (monthlyTrack[0] != -1 && monthlyTrack[1] != -1) {
            diff = Math.abs(monthlyTrack[0] - monthlyTrack[1]);
            let isDiffConsistent = true, isTrackConsistent = true;
            for (let i = 2; i < monthlyTrack.length; i++) {
                if (monthlyTrack[i] == -1) {
                    isTrackConsistent = false;
                    console.log('Monthly track record is not consistent');
                    break;
                }
                if (Math.abs(monthlyTrack[i] - monthlyTrack[i - 1]) != diff) {
                    isDiffConsistent = false;
                }
            }
            if (isTrackConsistent && isDiffConsistent) {
                console.log('TYPE B');
            } else if (isTrackConsistent && !isDiffConsistent) {
                console.log('TYPE A');
            } else {

            }
        } else {
            console.log('Monthly track record is not consistent');
        }
    }
}

init(accountBalanceHistory);