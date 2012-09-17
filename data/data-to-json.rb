require 'json'
fin = open "tic-tac-toe.data.1", 'r'
fout = open "tic-tac-examples.js", 'w'
fout.write "var examples = [\n"
fin.each do |line|
  parts = line.split(',')
  h = {
    top_left_square: parts[0],
    top_middle_square: parts[1],
    top_right_square: parts[2],
    middle_left_square: parts[3],
    middle_middle_square: parts[4],
    middle_right_square: parts[5],
    bottom_left_square: parts[6],
    bottom_middle_square: parts[7],
    bottom_right_square: parts[8],
    classification: parts[9].strip
  }
  fout.write h.to_json + ",\n"
end

fout.write "];\n"

fout.write "examples = _(examples);\n"
fout.write "var features = ['top_left_square','top_middle_square','top_right_square','middle_left_square','middle_middle_square','middle_right_square','bottom_left_square','bottom_middle_square','bottom_right_square'];\n"

fin.close
fout.close
