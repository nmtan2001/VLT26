import os
import sys
import numpy as np
import pandas as pd
from sklearn.metrics import f1_score
import traceback

def calculate_macro_f1(gt_list, pred_list):
    """
    Calculate the macro F1 score between two lists of labels.
    """
    if len(gt_list) != len(pred_list):
        print("Number of items in groundtruth and prediction do not match!")
        sys.exit(1)
    
    # If the lists are numeric, f1_score expects integers or strings as labels
    macro_f1 = f1_score(gt_list, pred_list, average='macro')
    return macro_f1

def load_list_from_file(file_path):
    """
    A helper function to load a list of integer labels from either:
      - a .pkl file storing a Python list
      - a .txt file with integers (e.g., one per line, or space-separated).
    Adjust as needed based on your actual file format.
    """
    if file_path.endswith('.pkl'):
        # This should retrieve a Python list if you saved it with pd.to_pickle(...)
        data = pd.read_pickle(file_path)
        # data should already be a list, but you can confirm:
        if not isinstance(data, list):
            raise ValueError("The .pkl file did not contain a Python list!")
        return data
    elif file_path.endswith('.txt'):
        # If .txt has one label per line OR space-separated integers, adapt accordingly:
        with open(file_path, 'r') as f:
            content = f.read().strip().split()
            data = [int(x) for x in content]
        return data
    else:
        raise ValueError(f"Unsupported file extension: {file_path}")

def main_evaluation(paths):
    groundtruth_dir = paths['g']
    prediction_dir = paths['s']

    # Find your groundtruth file (pkl or txt)
    g_files = [f for f in os.listdir(groundtruth_dir) 
               if f.endswith('.pkl') or f.endswith('.txt')]
    if len(g_files) == 0:
        print("No groundtruth file with .pkl or .txt extension found!")
        sys.exit(1)
    groundtruth_file = os.path.join(groundtruth_dir, g_files[0])

    # Find your prediction file (pkl or txt)
    p_files = [f for f in os.listdir(prediction_dir) 
               if f.endswith('.pkl') or f.endswith('.txt')]
    if len(p_files) == 0:
        print("No prediction file with .pkl or .txt extension found!")
        sys.exit(1)
    prediction_file = os.path.join(prediction_dir, p_files[0])

    # Load them as lists of labels
    groundtruth = load_list_from_file(groundtruth_file)
    predictions = load_list_from_file(prediction_file)

    # Now calculate Macro F1 from these lists
    macro_f1 = calculate_macro_f1(groundtruth, predictions)
    return {'macro_f1': macro_f1}

if __name__ == "__main__":
    [_, input_dir, output_dir] = sys.argv

    # Directories
    submission_dir = os.path.join(input_dir, 'res')
    truth_dir = os.path.join(input_dir, 'ref')

    try:
        res_dict = main_evaluation({'g': truth_dir, 's': submission_dir})
    except Exception as e:
        # Print the full traceback for debugging
        traceback.print_exc()
        sys.exit(1)

    print('Macro F1: {:.4f}'.format(res_dict['macro_f1']))
    with open(os.path.join(output_dir, 'scores.txt'), 'w') as output_file:
        output_file.write("Macro_F1: {:.4f}\n".format(res_dict['macro_f1']))

