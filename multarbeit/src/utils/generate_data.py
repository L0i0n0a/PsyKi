import random
import json
import os

def generate_entries(num_entries=200, high_acc=0.93, low_acc=0.4, low_acc_count=14):
    entries = []
    first_10 = [high_acc] * 10
    rest = [high_acc] * (num_entries - 10 - low_acc_count) + [low_acc] * low_acc_count
    random.shuffle(rest)
    ai_accuracies = first_10 + rest

    for i in range(num_entries):
        if i != 0 and i % 50 == 0:
            color = 1
        else:
            color = 0
            while abs(color) < 0.3:
                color = round(random.uniform(-0.9, 0.9), 2)
        divergence = random.choice([-0.05, 0.05])
        entry = {
            "color": color,
            "aiAccuracy": ai_accuracies[i],
            "divergence": divergence
        }
        entries.append(entry)
    return entries

def generate_test_entries(num_entries=20):
    entries = []
    for i in range(num_entries):
        color = 0
        while abs(color) < 0.3:
            color = round(random.uniform(-0.9, 0.9), 2)
        entry = {"color": color}
        entries.append(entry)
    return entries

def main():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    lib_dir = os.path.join(base_dir, '..', 'lib')
    os.makedirs(lib_dir, exist_ok=True)

    entries_main = generate_entries()
    with open(os.path.join(lib_dir, "dataMain.json"), "w") as f:
        json.dump(entries_main, f, indent=2)

    entries_test = generate_test_entries()
    with open(os.path.join(lib_dir, "dataTest.json"), "w") as f:
        json.dump(entries_test, f, indent=2)

if __name__ == "__main__":
    main()