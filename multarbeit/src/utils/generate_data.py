"""
Data Generation Script for PsyKi Research Application

Generates synthetic trial data for the Optimal Weighting study, including
main phase trials with varying AI accuracy and test phase calibration data.
"""

import random
import json
import os

def generate_entries(num_entries=200, high_acc=0.93, low_acc=0.4, low_acc_count=14):
    """
    Generate main phase trial entries with mixed AI accuracy levels

    Args:
        num_entries (int): Total number of trials to generate (default: 200)
        high_acc (float): High AI accuracy value (default: 0.93)
        low_acc (float): Low AI accuracy value (default: 0.4)
        low_acc_count (int): Number of low accuracy trials (default: 14)

    Returns:
        list: Trial entries with index, color, and AI accuracy data
    """
    entries = []

    # First 10 trials use high accuracy for participant training
    first_10 = [high_acc] * 10

    # Remaining trials mix high and low accuracy, then shuffle
    rest = [high_acc] * (num_entries - 10 - low_acc_count) + [low_acc] * low_acc_count
    random.shuffle(rest)

    ai_accuracies = first_10 + rest

    for i in range(num_entries):
        # Every 50th trial (except last) is a break with neutral color
        if i > 0 and (i + 1) % 50 == 0 and i < 199:
            color = 0  # Neutral/break trial
        else:
            color = random.choice([48, 52])  # Blue (52) or Orange (48) stimulus

        entry = {
            "index": i + 1,
            "color": color,
            "aiAccuracy": ai_accuracies[i],
        }
        entries.append(entry)
    return entries

def generate_test_entries(num_entries=20):
    """
    Generate test phase calibration entries

    Args:
        num_entries (int): Number of test trials (default: 20)

    Returns:
        list: Test trial entries with index and color data
    """
    entries = []
    for i in range(num_entries):
        color = random.choice([48, 52])  # Random blue/orange stimuli
        entry = {
            "index": i + 1,
            "color": color
        }
        entries.append(entry)
    return entries

def main():
    """Generate and save trial data files"""
    # Create lib directory for data files
    base_dir = os.path.dirname(os.path.abspath(__file__))
    lib_dir = os.path.join(base_dir, '..', 'lib')
    os.makedirs(lib_dir, exist_ok=True)

    # Generate main phase data (200 trials with AI accuracy variation)
    entries_main = generate_entries()
    with open(os.path.join(lib_dir, "dataMain.json"), "w") as f:
        json.dump(entries_main, f, indent=2)

    # Generate test phase data (20 calibration trials)
    entries_test = generate_test_entries()
    with open(os.path.join(lib_dir, "dataTest.json"), "w") as f:
        json.dump(entries_test, f, indent=2)

if __name__ == "__main__":
    main()