import json
import matplotlib.pyplot as plt
import statistics

def get_dprime_values_with_index_199(json_path):
    with open(json_path, 'r', encoding='utf-8') as file:
        data = json.load(file)

    dprime_values = []

    def recursive_search(obj):
        if isinstance(obj, dict):
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
    labels = ['Median (index 199)', 'Reference (3.8)']
    values = [median_value, reference_value]
    colors = ['cornflowerblue', 'lightcoral']

    plt.figure(figsize=(6, 6))
    bars = plt.bar(labels, values, color=colors)

    # Add value labels on top
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
        print("Usage: python compare_median_to_reference.py <path_to_json_file>")
    else:
        path = sys.argv[1]
        values = get_dprime_values_with_index_199(path)

        if values:
            median_val = statistics.median(values)
            print(f"Median of dPrimeTeam (index 199): {median_val:.4f}")
            plot_median_vs_reference(median_val, 3.8)
        else:
            print("No dPrimeTeam values found where index == 199.")
