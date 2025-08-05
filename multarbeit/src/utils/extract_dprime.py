"""
D-Prime Extraction and Visualization Script for PsyKi Research

Extracts team d-prime values from participant data and compares them
against reference values from research literature. Used for validating
Optimal Weighting model performance in the PsyKi study.
"""

import json
import matplotlib.pyplot as plt
import statistics

def get_dprime_values_with_index_199(json_path):
    """
    Extract team d-prime values from JSON data where trial index equals 199

    Args:
        json_path (str): Path to JSON file containing participant data

    Returns:
        list: d-prime team values from trials with index 199
    """
    with open(json_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    dprime_values = []

    def recursive_search(obj):
        """Recursively search nested JSON structure for d-prime values"""
        if isinstance(obj, dict):
            # Look for trials with index 199 that contain team d-prime data
            if obj.get("index") == 199 and "dPrimeTeam" in obj:
                dprime_values.append(obj["dPrimeTeam"])
            for value in obj.values():
                recursive_search(value)
        elif isinstance(obj, list):
            for item in obj:
                recursive_search(item)

    recursive_search(data)
    return dprime_values

def plot_median_vs_reference(median_value, reference_value):
    """
    Create bar chart comparing median d-prime with reference value

    Args:
        median_value (float): Calculated median from participant data
        reference_value (float): Reference value from research literature (3.8)
    """
    labels = ['Median (index 199)', 'Reference (3.8)']
    values = [median_value, reference_value]
    colors = ['cornflowerblue', 'lightcoral']

    plt.figure(figsize=(6, 6))
    bars = plt.bar(labels, values, color=colors)

    # Add value labels on top of bars
    for bar in bars:
        height = bar.get_height()
        plt.text(bar.get_x() + bar.get_width()/2, height + 0.05,
                 f'{height:.2f}', ha='center', va='bottom', fontsize=12)

    plt.ylim(0, max(values) + 1)
    plt.title("Median dPrimeTeam vs Reference Value (3.8)")
    plt.ylabel("dPrimeTeam Value")
    plt.grid(axis='y', linestyle='--', alpha=0.6)
    plt.tight_layout()
    plt.show()

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python extract_dprime.py <path_to_json_file>")
    else:
        path = sys.argv[1]
        # Extract d-prime values from participant data
        values = get_dprime_values_with_index_199(path)

        if values:
            # Calculate median and compare with reference
            median_val = statistics.median(values)
            print(f"Median of dPrimeTeam (index 199): {median_val:.4f}")
            plot_median_vs_reference(median_val, 3.8)
        else:
            print("No dPrimeTeam values found where index == 199.")
