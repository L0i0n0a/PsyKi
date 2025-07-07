import random
import json

def generate_entries(num_entries=200, high_acc=0.93, low_acc=0.4, low_acc_count=14):
    entries = []
    ai_accuracies = [high_acc] * (num_entries - low_acc_count) + [low_acc] * low_acc_count
    random.shuffle(ai_accuracies)

    for i in range(num_entries):
        if i % 50 == 0:
            color = 1
        else:
            color = 0
            while color == 0:
                color = round(random.uniform(-0.9, 0.9), 1)
        entry = {
            "color": color,
            "aiAccuracy": ai_accuracies[i]
        }
        entries.append(entry)
    return entries

def main():
    entries = generate_entries()
    with open("dataMain.json", "w") as f:
        json.dump(entries, f, indent=2)

if __name__ == "__main__":
    main()