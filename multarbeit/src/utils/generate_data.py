import random
import json

entries = []
ai_accuracies = [0.93]*186 + [0.4]*14
random.shuffle(ai_accuracies)

for i in range(200):
    if i % 50 == 0:
        color = 1
    else:
        color = round(random.uniform(-0.09, 0.09), 3)
    entry = {
        "color": color,
        "aiAccuracy": ai_accuracies[i]
    }
    entries.append(entry)

with open("dataMainDe.json", "w") as f:
    json.dump(entries, f, indent=2)